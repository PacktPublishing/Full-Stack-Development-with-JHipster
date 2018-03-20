import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
// TODO import TextFormat only when fieldContainsDate
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FaArrowLeft } from 'react-icons/lib/fa';

import { getEntity } from './employee.reducer';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IEmployeeDetailProps {
  getEntity: ICrudGetAction;
  employee: any;
  match: any;
}

export class EmployeeDetail extends React.Component<IEmployeeDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { employee } = this.props;
    return (
      <div>
        <h2>
          <Translate contentKey="jhreactApp.employee.detail.title">Employee</Translate> [<b>{employee.id}</b>]
        </h2>
        <dl className="row-md jh-entity-details">
          <dt>
            <span id="name">
              <Translate contentKey="jhreactApp.employee.name">name</Translate>
            </span>
          </dt>
          <dd>{employee.name}</dd>
          <dt>
            <span id="age">
              <Translate contentKey="jhreactApp.employee.age">age</Translate>
            </span>
          </dt>
          <dd>{employee.age}</dd>
          <dt>
            <span id="dob">
              <Translate contentKey="jhreactApp.employee.dob">dob</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={employee.dob} type="date" format={APP_DATE_FORMAT} />
          </dd>
          <dt>
            <Translate contentKey="jhreactApp.employee.user">User</Translate>
          </dt>
          <dd>{employee.user ? employee.user.login : ''}</dd>
        </dl>
        <Button tag={Link} to="/employee" replace color="info">
          <FaArrowLeft />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
      </div>
    );
  }
}

const mapStateToProps = storeState => ({
  employee: storeState.employee.entity
});

const mapDispatchToProps = { getEntity };

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeDetail);
