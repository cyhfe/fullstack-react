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
  };
  componentDidMount() {
    client.getAlbums(ALBUM_IDS).then((albums) => {
      this.setState({ albums });
    });
  }
  render() {
    const matchPath = this.props.match.path;
    return (
      <div>
        <VerticalMenu albums={this.state.albums} albumsPath={matchPath} />
        <Album />
      </div>
    );
  }
}

export default AlbumsContainer;
