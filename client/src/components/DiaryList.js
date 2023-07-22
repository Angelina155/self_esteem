import { observer } from 'mobx-react-lite'
import { Col, Nav, Row } from "react-bootstrap";
import Tab from 'react-bootstrap/Tab';

import DiaryItem from "./DiaryItem";
import "../styles/App.css"

const DiaryList = observer(({notes, deleteNote, editNote}) => {
    console.log(notes)

    return (
        <Tab.Container className="p-4" id="left-tabs-example" defaultActiveKey="first">
            {notes.length ?
                (
                    <Row className="mt-3 p-4">
                        <Col sm={3}>
                            <Nav variant="pills" className="flex-column">
                                {notes.map(note =>
                                    <Nav.Item  style={{cursor: 'pointer'}} key={note.id}>
                                        <Nav.Link eventKey={note.id}>{note.title.length ?(note.title):("Без названия")}</Nav.Link>
                                    </Nav.Item>
                                )}
                            </Nav>
                        </Col>
                        <Col sm={9}>
                            <Tab.Content>
                                {notes.map(note =>
                                    <DiaryItem key={note.id} note={note} deleteNote={deleteNote} editNote={editNote}/>
                                )}
                            </Tab.Content>
                        </Col>
                    </Row>
                ) : (<h3 className="mt-3 p-4">Нет записей</h3>)
            }
        </Tab.Container>
    );
});
export default DiaryList