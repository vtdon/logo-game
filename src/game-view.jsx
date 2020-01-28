import React from 'react';
import './App.css';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { Container, Col, Row, Card, Modal } from 'react-bootstrap'

import { ReactComponent as Zoovu_z } from './zoovu-z.svg';
import { ReactComponent as Zoovu_o } from './zoovu-o.svg';
import { ReactComponent as Zoovu_v } from './zoovu-v.svg';
import { ReactComponent as Zoovu_u } from './zoovu-u.svg';

class ResultPopup extends React.Component {
    render() {
        return (
            <Modal.Dialog>
                <Modal.Body>
                    Solved! Time: {this.props.usertime}s. Will reset in 10s.
                </Modal.Body>
            </Modal.Dialog>
        )
    }
}

export class LogoGamePlayView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: this.props.username,
            playtime: 0,
            penalty: 0,
            latestDestination: 0,
            timerStart: 0,
            resultDisplay: false,

            items: [
                {id: '0', compLetter: "o", comp: <Zoovu_o /> }, 
                {id: '1', compLetter: "z", comp: <Zoovu_z /> }, 
                {id: '2', compLetter: "v", comp: <Zoovu_v /> }, 
                {id: '3', compLetter: "u", comp: <Zoovu_u /> }, 
                {id: '4', compLetter: "o", comp: <Zoovu_o /> }, 
            ],

            droplist: [
                {id: '0', compLetter: "", comp: "" }, 
                {id: '1', compLetter: "", comp: "" },  
                {id: '2', compLetter: "", comp: "" },  
                {id: '3', compLetter: "", comp: "" }, 
                {id: '4', compLetter: "", comp: "" }, 
            ]
         }

         this.onDragStart = this.onDragStart.bind(this);
         this.onDragEnd = this.onDragEnd.bind(this);
         this.resetGame = this.resetGame.bind(this);
         this.checkCard = this.checkCard.bind(this);
         this.checkCard2 = this.checkCard2.bind(this);
    }
    
    startTimer() {
        this.timerID = setInterval(
            () => this.setState({ playtime : Math.round((Date.now() - this.state.timerStart) / 1000) }),
            1000
        );
    }
    
    checkCard2(sourceIndex, destinationIndex) {
        switch (destinationIndex) {
            case 0: 
                if (this.state.items[sourceIndex].compLetter !== "z" ) {
                    this.setState({penalty : this.state.penalty + 10});
                    return false;
                }
                else
                    return true;
            case 1: 
                if (this.state.items[sourceIndex].compLetter !== "o" ) {
                    this.setState({penalty : this.state.penalty + 10});
                    return false;
                }
                else
                    return true;
            case 2: 
                if (this.state.items[sourceIndex].compLetter !== "o" ) {
                    this.setState({penalty : this.state.penalty + 10});
                    return false;
                }
                else
                    return true;
            case 3: 
                if (this.state.items[sourceIndex].compLetter !== "v" ) {
                    this.setState({penalty : this.state.penalty + 10});
                    return false;
                }
                else
                    return true;
            case 4: 
                if (this.state.items[sourceIndex].compLetter !== "u" ) {
                    this.setState({penalty : this.state.penalty + 10});
                    return false;
                }
                else
                    return true;
            default:
                return false;
        }
    }

    checkCard(destinationIndex) {
        console.log("checking index: ", this.state.latestDestination);
        console.log("checking list: ", this.state.droplist);
        switch (this.state.latestDestination) {
            case 0: 
                if (this.state.droplist[0].compLetter !== "z" )
                    this.setState({penalty : this.state.penalty + 10});
                break;
            case 1: 
                if (this.state.droplist[1].compLetter !== "o" )
                    this.setState({penalty : this.state.penalty + 10});
                break;
            case 2: 
                if (this.state.droplist[2].compLetter !== "o" )
                    this.setState({penalty : this.state.penalty + 10});
                break;
            case 3: 
                if (this.state.droplist[3].compLetter !== "v" )
                    this.setState({penalty : this.state.penalty + 10});
                break;
            case 4: 
                if (this.state.droplist[4].compLetter !== "u" )
                    this.setState({penalty : this.state.penalty + 10});
                break;
            default:
                break;
        }
    }

    resetGame() {
        this.setState({
            playtime: 0,
            penalty: 0,
            latestDestination: 0,
            timerStart: 0,
            playStarted: false,
            resultDisplay: false,
            items: [
                {id: '0', compLetter: "o", comp: <Zoovu_o /> }, 
                {id: '1', compLetter: "z", comp: <Zoovu_z /> }, 
                {id: '2', compLetter: "v", comp: <Zoovu_v /> }, 
                {id: '3', compLetter: "u", comp: <Zoovu_u /> }, 
                {id: '4', compLetter: "o", comp: <Zoovu_o /> }, 
            ],

            droplist: [
                {id: '0', compLetter: "", comp: "" }, 
                {id: '1', compLetter: "", comp: "" }, 
                {id: '2', compLetter: "", comp: "" }, 
                {id: '3', compLetter: "", comp: "" }, 
                {id: '4', compLetter: "", comp: "" }, 
            ]
        })
    }

    onDragStart(start) {
        if (!this.state.playStarted) {
            this.setState({
                timerStart: Date.now(),
                playStarted: true,
            }, this.startTimer)
        }
    }

    onDragEnd(result) {

        console.log("RESULT: ", result)
        console.log("ITEMS: ", this.state.items);
        console.log("DROPLIST: ", this.state.droplist);

        if (!result.destination) {
            return;
        }

        if (this.state.droplist[result.destination.index].comp !== "") {
            return;
        }

        if (this.checkCard2(result.source.index, result.destination.index) === false) {
            return;
        }

        let items2 = this.state.items;
        let removed = items2.splice(result.source.index, 1);
        items2.splice(result.source.index, 0, {id: result.source.index.toString(), compLetter: "", comp: "" });

        let droplist2 = this.state.droplist;
        let removed2 = droplist2.splice(result.destination.index, 1);
        droplist2.splice(result.destination.index, 0, { id: result.destination.index.toString(), compLetter: removed[0].compLetter, comp: removed[0].comp });

        console.log("ITEMS2: ", items2)
        console.log("DROPLIST2: ", droplist2)

        this.setState({
            items: items2,
            droplist: droplist2,
            latestDestination: result.destination.index
        }//,
        //this.checkCard
        );

        if (this.state.droplist[0].comp !== "" &&
            this.state.droplist[1].comp !== "" &&
            this.state.droplist[2].comp !== "" &&
            this.state.droplist[3].comp !== "" &&
            this.state.droplist[4].comp !== "" &&
            this.state.droplist[0].compLetter === "z" &&
            this.state.droplist[1].compLetter === "o" &&
            this.state.droplist[2].compLetter === "o" &&
            this.state.droplist[3].compLetter === "v" &&
            this.state.droplist[4].compLetter === "u"
        ) {
            clearInterval(this.timerID);
            this.setState({resultDisplay: true});
            setTimeout( this.resetGame, 10000);
        }
    }

    render() {
        return (
            <div className="gamePage">

                <Container>
                    <Row><br/></Row>
                    <Row>
                        <Col>
                            <span className="welcomeText alignLeft">Good luck, {this.state.username}!</span>
                        </Col>
                        <Col>

                        </Col>
                        <Col className="alignRight">
                            <span className="welcomeText">
                                <i className="far fa-clock timer"></i>
                                &nbsp;
                                <span className="score">Your score: {this.state.playtime + this.state.penalty} seconds</span>
                            </span>
                        </Col>
                    </Row>
                </Container>

                <DragDropContext onDragStart={this.onDragStart} onDragEnd={this.onDragEnd} >
                <Container>
                    <Row><br/></Row>
                    <Row>
                        <Col className="alignLeft">
                            <span>Pick up the right cards</span>
                        </Col>
                        <Col></Col>
                        <Col className="alignRight">
                            <span>The faster the better!</span>
                        </Col>
                    </Row>
                    <Row><br/></Row>
                    <Row>
                        <Droppable droppableId='PickupCards' direction="horizontal">
                            {(provided, snapshot) => (
                                <div 
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                >
                                    <Container>
                                        <Row>
                                        {this.state.items.map((item, index) => (
                                            <Draggable draggableId={item.id} key={item.id} index={index} >                                           
                                                {(provided, snapshot) => (
                                                    <div 
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                    >
                                                        <Col>
                                                            <Card className="logocard">
                                                                <Card.Body>{item.comp}</Card.Body>
                                                            </Card>
                                                        </Col>
                                                    </div>
                                                )}   
                                            </Draggable>
                                        ))}
                                        </Row>
                                        <Row><br/></Row>
                                        <Row>
                                            <Col><span className="alignLeft">..and drop them here to make the logo great again!</span></Col>
                                            <Col></Col>
                                        </Row>
                                        <Row><br/></Row>
                                        <Row>
                                        {this.state.droplist.map((item, index) => (
                                            <Col>
                                                <Card style={{ borderStyle:"dashed", borderWidth:"3px" }} className="logocard">
                                                    <Card.Body>{item.comp}</Card.Body>
                                                </Card>
                                            </Col>
                                        ))}
                                        </Row>
                                    </Container>
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </Row>
                    
                </Container>
                </DragDropContext>

                {this.state.resultDisplay?
                    <ResultPopup usertime={this.state.playtime + this.state.penalty} />
                : null
                }
            </div>
        )
    }
}
