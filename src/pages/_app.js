import App from 'next/app';
const { serialize, deserialize } = require('json-immutable');
import withRedux from 'next-redux-wrapper';
import makeStore from '../Components/redux/store';
import React from 'react';
import { Provider } from 'react-redux';
import Entity from '../Components/others/utilities/entity'
import '../../styles/main.scss'


class MyApp extends App {

    static async getInitialProps({ Component, ctx }) {

        if (ctx.req) {
            await ctx.store.execSagaTasks(ctx, dispatch => {

            });
        }
        const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};
        return { pageProps };
    }

    render() {
        const { Component, pageProps, store } = this.props;
        console.log('store', store)
        Entity.mContext = store;
        return (
            <Component {...pageProps} />
        )
    }
}

const wRedux = withRedux(makeStore, {
    serializeState: state => {
        return state ? serialize(state) : state;
    },
    deserializeState: state => {
        return state ? deserialize(state) : state;
    }
})(MyApp);

export default wRedux;