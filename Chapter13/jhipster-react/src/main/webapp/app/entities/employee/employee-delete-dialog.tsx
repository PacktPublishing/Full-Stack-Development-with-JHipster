import * as React from 'react';
import { connect } from 'react-redux';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { Translate, ICrudGetAction, ICrudDeleteAction } from 'react-jhipster';
import { FaBan, FaTrash } from 'react-icons/lib/fa';

import { getEntity, deleteEntity } from './employee.reducer';

export interface IEmployeeDeleteDialogProps {
  getEntity: ICrudGetAction;
  deleteEntity: ICrudDeleteAction;
  employee: any;
  match: any;
  history: any;
}

export interface IEmployeeDeleteDialogState {
  showModal: boolean;
}
export class EmployeeDeleteDialog extends React.Component<IEmployeeDeleteDialogProps, IEmployeeDeleteDialogState> {
  constructor(props) {
    super(props);
    this.state = {
      showModal: true
    };
  }

  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  confirmDelete = () => {
    this.props.deleteEntity(this.props.employee.id);
    this.handleClose();
  };

  handleClose = () => {
    this.setState({
      showModal: false
    });
    this.props.history.push('/employee');
  };

  render() {
    const { employee } = this.props;
    const { showModal } = this.state;
    return (
      <Modal isOpen={showModal} modalTransition={{ timeout: 20 }} backdropTransition={{ timeout: 10 }} toggle={this.handleClose}>
        <ModalHeader toggle={this.handleClose}>
          <Translate contentKey="entity.delete.title">Confirm delete operation</Translate>
        </ModalHeader>
        <ModalBody>
          <Translate contentKey="jhreactApp.employee.delete.question" interpolate={{ id: employee.id }}>
            Are you sure you want to delete this Employee?
          </Translate>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={this.handleClose}>
            <FaBan />&nbsp;
            <Translate contentKey="entity.action.cancel">Cancel</Translate>
          </Button>
          <Button color="danger" onClick={this.confirmDelete}>
            <FaTrash />&nbsp;
            <Translate contentKey="entity.action.delete">Delete</Translate>
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = storeState => ({
  employee: storeState.employee.entity
});

const mapDispatchToProps = { getEntity, deleteEntity };

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeDeleteDialog);
