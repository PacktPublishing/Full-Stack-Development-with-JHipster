import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
// TODO import TextFormat only when fieldContainsDate
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FaPlus, FaEye, FaPencil, FaTrash } from 'react-icons/lib/fa';

import { getusers, getEntities } from './employee.reducer';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IEmployeeProps {
  getEntities: ICrudGetAllAction;
  employees: any[];
  getusers: ICrudGetAllAction;
  match: any;
}

export class Employee extends React.Component<IEmployeeProps> {
  componentDidMount() {
    this.props.getEntities();
    this.props.getusers();
  }

  render() {
    const { employees, match } = this.props;
    return (
      <div>
        <h2>
          <Translate contentKey="jhreactApp.employee.home.title">Employees</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity">
            <FaPlus /> <Translate contentKey="jhreactApp.employee.home.createLabel" />
          </Link>
        </h2>
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="jhreactApp.employee.name">Name</Translate>
                </th>
                <th>
                  <Translate contentKey="jhreactApp.employee.age">Age</Translate>
                </th>
                <th>
                  <Translate contentKey="jhreactApp.employee.dob">Dob</Translate>
                </th>
                <th>
                  <Translate contentKey="jhreactApp.employee.user">User</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {employees.map((employee, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${employee.id}`} color="link" size="sm">
                      {employee.id}
                    </Button>
                  </td>
                  <td>{employee.name}</td>
                  <td>{employee.age}</td>
                  <td>
                    <TextFormat type="date" value={employee.dob} format={APP_DATE_FORMAT} />
                  </td>
                  <td>{employee.user ? employee.user.login : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${employee.id}`} color="info" size="sm">
                        <FaEye />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view" />
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${employee.id}/edit`} color="primary" size="sm">
                        <FaPencil />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit" />
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${employee.id}/delete`} color="danger" size="sm">
                        <FaTrash />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete" />
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = storeState => ({
  employees: storeState.employee.entities
});

const mapDispatchToProps = { getusers, getEntities };

export default connect(mapStateToProps, mapDispatchToProps)(Employee);
