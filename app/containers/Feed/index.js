import React from 'react';
import Header from './../../components/Header';
import Feed from './../../components/Feed';

export default class FeedPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header" >
        <Header />
        <main className="mdl-layout__content mdl-color--grey-100" >
          <Feed />
        </main>
      </div>
    );
  }
}
