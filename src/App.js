import React from 'react';
import { Switch, Route } from 'react-router-dom';

import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import Header from './components/header/header.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';

class App extends React.Component {
    constructor() {
        super();

        this.state = {
            currentUser: null,
        };
    }

    unsubsscribeFromAuth = null;

    componentDidMount() {
        this.unsubsscribeFromAuth = auth.onAuthStateChanged(
            async (userAuth) => {
                if (userAuth) {
                    const userRef = await createUserProfileDocument(userAuth);

                    userRef.onSnapshot((snapShot) => {
                        this.setState(
                            {
                                currentUser: {
                                    id: snapShot.id,
                                    ...snapShot.data(),
                                },
                            },
                            () => {
                                console.log(this.state);
                            }
                        );
                    });
                } else {
                    this.setState({ currentUser: userAuth });
                }
            }
        );
    }

    componentWillUnmount() {
        this.unsubsscribeFromAuth();
    }

    render() {
        return (
            <div>
                <Header currentUser={this.state.currentUser}></Header>
                <Switch>
                    <Route exact path="/" component={HomePage}></Route>
                    <Route path="/shop" component={ShopPage}></Route>
                    <Route
                        path="/signin"
                        component={SignInAndSignUpPage}
                    ></Route>
                </Switch>
            </div>
        );
    }
}

export default App;
