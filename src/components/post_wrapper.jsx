import React from 'react'
import Post from '../containers/single_post.jsx'

export default class PostWrap extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div>

                <section id="page-post" className="mdl-grid fp-content">
                    <div className="fp-image-container mdl-cell mdl-cell--12-col mdl-grid">
                        <Post postId={this.props.params.postId}></Post>
                    </div>
                </section>
            </div>
        )
    }
}

