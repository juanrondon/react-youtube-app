import ReactDOM from 'react-dom';
import SearchBar from './components/search-bar';
import YTSearch from 'youtube-api-search';
import React, { Component } from 'react';
import VideoList from './components/video-list';
import VideoDetail from './components/video-detail';
import _ from 'lodash';

const API_KEY = 'AIzaSyCq-Z1IH4ZtDfd0ofSN3nxxiygqevW4l-s';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      videos: [],
      selectedVideo: null
    };
    this.videoSearch('pc games');
  }

  videoSearch(term) {
    YTSearch({ key: API_KEY, term: term }, (videos) => {
      this.setState({
        videos,
        selectedVideo: videos[0]
      });
    });
  }

  render() {

    const videoSearch = _.debounce((term) => {
      this.videoSearch(term);
    }, 300)

    return (
      <div>
        <SearchBar onSearchChange={videoSearch} />
        <VideoDetail video={this.state.selectedVideo} />
        <VideoList
          onVideoSelect={(selectedVideo) => {
            this.setState({ selectedVideo });
          }}
          videos={this.state.videos} />
      </div>
    );
  }
};

//take component and put it in DOM
ReactDOM.render(<App />, document.querySelector('.container'));