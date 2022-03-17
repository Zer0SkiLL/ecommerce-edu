import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import Header from './components/header/header.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import NotFound from './pages/not-found/not-found.component';
import { setCurrentUser } from './redux/user/user.actions';

class App extends React.Component {
    unsubsscribeFromAuth = null;

    componentDidMount() {
        const { setCurrentUser } = this.props;
        this.unsubsscribeFromAuth = auth.onAuthStateChanged(
            async (userAuth) => {
                if (userAuth) {
                    const userRef = await createUserProfileDocument(userAuth);

                    userRef.onSnapshot((snapShot) => {
                        this.props.setCurrentUser({
                            id: snapShot.id,
                            ...snapShot.data(),
                        });
                    });
                }

                setCurrentUser(userAuth);
            }
        );
    }

    componentWillUnmount() {
        this.unsubsscribeFromAuth();
    }

    render() {
        return (
            <div>
                <Header></Header>
                <Switch>
                    <Route exact path="/" component={HomePage}></Route>
                    <Route path="/shop" component={ShopPage}></Route>
                    <Route
                        exact
                        path="/signin"
                        render={() =>
                            this.props.currentUser ? (
                                <Redirect to="/" />
                            ) : (
                                <SignInAndSignUpPage></SignInAndSignUpPage>
                            )
                        }
                    ></Route>
                    <Route exact path="*" component={NotFound}></Route>
                </Switch>
            </div>
        );
    }
}

const mapStateToProps = ({ user }) => ({
    currentUser: user.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
    setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
