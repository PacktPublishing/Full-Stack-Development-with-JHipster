import * as React from 'react';
import { connect } from 'react-redux';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvFeedback } from 'availity-reactstrap-validation';
import { Translate, ICrudGetAction, ICrudPutAction } from 'react-jhipster';
import { FaBan, FaFloppyO } from 'react-icons/lib/fa';

import { getEntity, updateEntity, createEntity } from './employee.reducer';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';

export interface IEmployeeDialogProps {
  getEntity: ICrudGetAction;
  updateEntity: ICrudPutAction;
  createEntity: ICrudPutAction;
  loading: boolean;
  updating: boolean;
  employee: any;
  users: any[];
  match: any;
  history: any;
}

export interface IEmployeeDialogState {
  showModal: boolean;
  isNew: boolean;
  userId: number;
}

export class EmployeeDialog extends React.Component<IEmployeeDialogProps, IEmployeeDialogState> {
  constructor(props) {
    super(props);
    this.state = {
      isNew: !this.props.match.params || !this.props.match.params.id,
      userId: 0,
      showModal: true
    };
  }

  componentDidMount() {
    !this.state.isNew && this.props.getEntity(this.props.match.params.id);
  }

  saveEntity = (event, errors, values) => {
    values.dob = new Date(values.dob);
    if (this.state.isNew) {
      this.props.createEntity(values);
    } else {
      this.props.updateEntity(values);
    }
    this.handleClose();
  };

  handleClose = () => {
    this.setState({
      showModal: false
    });
    this.props.history.push('/employee');
  };

  userUpdate = element => {
    const login = element.target.value;
    for (const i in this.props.users) {
      if (login.toString() === this.props.users[i].login.toString()) {
        this.setState({
          userId: this.props.users[i].id
        });
      }
    }
  };

  render() {
    const isInvalid = false;
    const { employee, users, loading, updating } = this.props;
    const { showModal, isNew } = this.state;
    return (
      <Modal isOpen={showModal} modalTransition={{ timeout: 20 }} backdropTransition={{ timeout: 10 }} toggle={this.handleClose} size="lg">
        <ModalHeader toggle={this.handleClose}>
          <Translate contentKey="jhreactApp.employee.home.createOrEditLabel">Create or edit a Employee</Translate>
        </ModalHeader>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <AvForm model={isNew ? {} : employee} onSubmit={this.saveEntity}>
            <ModalBody>
              {employee.id ? (
                <AvGroup>
                  <Label for="id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="nameLabel" for="name">
                  <Translate contentKey="jhreactApp.employee.name">name</Translate>
                </Label>
                <AvInput type="text" className="form-control" name="name" required />
                <AvFeedback>This field is required.</AvFeedback>
                <AvFeedback>This field cannot be longer than 50 characters.</AvFeedback>
              </AvGroup>
              <AvGroup>
                <Label id="ageLabel" for="age">
                  <Translate contentKey="jhreactApp.employee.age">age</Translate>
                </Label>
                <AvInput type="text" className="form-control" name="age" required />
                <AvFeedback>This field is required.</AvFeedback>
                <AvFeedback>This field cannot be longer than 50 characters.</AvFeedback>
              </AvGroup>
              <AvGroup>
                <Label id="dobLabel" for="dob">
                  <Translate contentKey="jhreactApp.employee.dob">dob</Translate>
                </Label>
                <AvInput
                  type="datetime-local"
                  className="form-control"
                  name="dob"
                  value={convertDateTimeFromServer(this.props.employee.dob)}
                  required
                />
                <AvFeedback>This field is required.</AvFeedback>
              </AvGroup>
              <AvGroup>
                <Label for="user.login">
                  <Translate contentKey="jhreactApp.employee.user">User</Translate>
                </Label>
                <AvInput type="select" className="form-control" name="user.login" onChange={this.userUpdate}>
                  <option value="" key="0" />
                  {users.map(otherEntity => (
                    <option value={otherEntity.login} key={otherEntity.id}>
                      {otherEntity.login}
                    </option>
                  ))}
                </AvInput>
                <AvInput type="hidden" name="user.id" value={this.state.userId} />
              </AvGroup>
            </ModalBody>
            <ModalFooter>
              <Button color="secondary" onClick={this.handleClose}>
                <FaBan />&nbsp;
                <Translate contentKey="entity.action.cancel">Cancel</Translate>
              </Button>
              <Button color="primary" type="submit" disabled={isInvalid || updating}>
                <FaFloppyO />&nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </ModalFooter>
          </AvForm>
        )}
      </Modal>
    );
  }
}

const mapStateToProps = storeState => ({
  employee: storeState.employee.entity,
  users: storeState.employee.users,
  loading: storeState.employee.loading,
  updating: storeState.employee.updating
});

const mapDispatchToProps = { getEntity, updateEntity, createEntity };

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeDialog);
