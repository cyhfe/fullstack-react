import React from "react";
import { NavLink } from "react-router-dom";

class VerticalMenu extends React.Component {
  render() {
    return (
      <div>
        {this.props.albums.map((album) => {
          return (
            <NavLink
              to={{
                pathname: `${this.props.albumsPath}/${album.name.replace(/\s/g, '')}`,
                state: {
                  id: album.id
                }
              }}
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
