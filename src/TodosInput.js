import React from 'react';

export default ({ name }) => (
  <div className="container">
    <form>
      <nav className="columns is-mobile">
        <div className="column is-three-quarters">
          <div className="field">
            <div className="control">
              <input className="input is-primary" type="text" placeholder="Insert a TODO" />
            </div>
          </div>
        </div>
        <div className="column">
          <a className="button is-primary is-full-width">Add TODO</a>
        </div>
      </nav>
    </form>
  </div>);

