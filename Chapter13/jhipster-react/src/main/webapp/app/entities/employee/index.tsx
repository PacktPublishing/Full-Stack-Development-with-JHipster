import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ModalRoute } from 'react-router-modal';

import Employee from './employee';
import EmployeeDetail from './employee-detail';
import EmployeeDialog from './employee-dialog';
import EmployeeDeleteDialog from './employee-delete-dialog';

const Routes = ({ match }) => (
  <div>
    <Switch>
      <Route exact path={match.url} component={Employee} />
      <ModalRoute exact parentPath={match.url} path={`${match.url}/new`} component={EmployeeDialog} />
      <ModalRoute exact parentPath={match.url} path={`${match.url}/:id/delete`} component={EmployeeDeleteDialog} />
      <ModalRoute exact parentPath={match.url} path={`${match.url}/:id/edit`} component={EmployeeDialog} />
      <Route exact path={`${match.url}/:id`} component={EmployeeDetail} />
    </Switch>
  </div>
);

export default Routes;
