import * as React from 'react';
// tslint:disable-next-line:no-unused-variable
import { Route, Switch } from 'react-router-dom';

import Employee from './employee';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <Route path={'/employee'} component={Employee}/>
      {/* jhipster-needle-add-route-path - JHipster will routes here */}
    </Switch>
  </div>
);

export default Routes;
