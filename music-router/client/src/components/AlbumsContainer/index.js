import React from "react";
import client from "../../client";
import VerticalMenu from "../VerticalMenu";
import Album from "../Album";
const ALBUM_IDS = [
  "23O4F21GDWiGd33tFN3ZgI",
  "3AQgdwMNCiN7awXch5fAaG",
  "1kmyirVya5fRxdjsPFDM05",
  "6ymZBbRSmzAvoSGmwAFoxm",
  "4Mw9Gcu1LT7JaipXdwrq1Q",
];

class AlbumsContainer extends React.Component {
  state = {
    albums: [],
    loading: false,
  };
  componentDidMount() {
    this.getAlbums();
  }
  getAlbums = () => {
    this.setState({
      loading: true,
    });
    client.getAlbums(ALBUM_IDS).then((albums) => {
      this.setState({ albums, loading: false });
    });
  };
  render() {
    const matchPath = this.props.match.path;
    if (this.state.loading) {
      return <div>loading albums...</div>;
    } else {
      const id = this.props.location.state?.id;
      return (
        <div>
          <VerticalMenu albums={this.state.albums} albumsPath={matchPath} />
          {!id ? (
            <div>please select a album</div>
          ) : (
            <Album album={this.state.albums.find((album) => album.id === id)} />
          )}
        </div>
      );
    }
  }
}

export default AlbumsContainer;
