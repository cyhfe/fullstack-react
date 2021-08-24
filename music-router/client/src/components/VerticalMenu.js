import React from "react";
import { NavLink } from "react-router-dom";

class VerticalMenu extends React.Component {
  render() {
    return (
      <div>
        {this.props.albums.map((album) => {
          return (
            <NavLink
              to={`${this.props.albumsPath}/${album.id}`}
              activeClassName="active"
              key={album.id}
            >
              {album.name}
            </NavLink>
          );
        })}
      </div>
    );
  }
}

export default VerticalMenu;
