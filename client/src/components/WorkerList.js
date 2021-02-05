import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup} from "react-transition-group";
import PropTypes from 'prop-types';

class WorkerList extends Component {

    componentDidMount() {
        this.props.getWorkers();
    }

    onDeleteClick = (id) => {
        this.props.deleteWorker(id)
    }

    onClickAddWorker = () => {
        const name = prompt('Enter worker name')
        this.props.addWorker(name);
    }

    render() {
        const { workers } = this.props;
        return(
            <Container>
                <Button color="dark" onClick={this.onClickAddWorker}>Add Item</Button>

                <ListGroup>
                    <TransitionGroup className="worker-list">
                        {workers.map(({id, name}) => (
                            <CSSTransition key={id} timeout={500} classNames="fade">
                                <ListGroupItem>
                                    <Button
                                        className="remove-btn"
                                        color="danger"
                                        size="sm"
                                        onClick={this.onDeleteClick.bind(this, id)}
                                        >&times;
                                    </Button>
                                    {name}
                                </ListGroupItem>
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                </ListGroup>
            </Container>
        );
    }
}

WorkerList.propTypes = {
    getWorkers: PropTypes.func.isRequired,
    workers: PropTypes.object.isRequired,
    addWorker: PropTypes.func.isRequired
}

export default WorkerList;