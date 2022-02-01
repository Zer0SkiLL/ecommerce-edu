import React from "react";

import SHOP_DATA from "./shop.data";

import CollcetionPreview from "../../components/collection-preview/collection-preview.component";

class ShopPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            collections: SHOP_DATA,
        };
    }

    render() {
        const { collections } = this.state;
        return (
            <div className="shop-page">
                {collections.map(({ id, ...otherCollectionProps }) => (
                    <CollcetionPreview
                        key={id}
                        {...otherCollectionProps}
                    ></CollcetionPreview>
                ))}
            </div>
        );
    }
}

export default ShopPage;
