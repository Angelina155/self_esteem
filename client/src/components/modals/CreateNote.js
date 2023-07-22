import { observer } from 'mobx-react-lite'
import { Button, Dropdown, Form } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import React, { useContext, useEffect, useState } from "react";
import RangeSlider from "react-bootstrap-range-slider";

import { AppContext } from "../../components/AppContext";
import { createItem } from "../../http/itemAPI";
import ItemFormField from "../ItemFormField";
import MarkSlider from "../MarkSlider";
import '../../styles/App.css'

const CreateNote = ({show, onHide, func, initialNote, buttonName}) => {
    const { item} = useContext(AppContext)
    const [note, setNote] = useState(initialNote)
    const [catName, setCatName] = useState(initialNote.categoryName)

    const changeCategory = (selectedCategory) => {
        setCatName(selectedCategory.name)
        setNote({...note, categoryId: selectedCategory.id})
        item.setSelectedCategory(selectedCategory)
    }

    const addNewNote = (e) => {
        e.preventDefault()
        func(note)
        onHide()
    }

    return (
        <div>
            <Modal show={show} onHide={onHide} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Добавьте новую запись</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{width: "100%"}}>
                    <Form className="d-flex flex-column" style={{width: "100%"}}>
                        <ItemFormField value={note.title} func={(field) => setNote({...note, title: field})} placeholder="Введите заголовок"/>
                        <ItemFormField value={note.a} func={(field) => setNote({...note, a: field})} placeholder="Что случилось?"/>
                        <ItemFormField value={note.b} func={(field) => setNote({...note, b: field})} placeholder="Как Вы отреагировали?"/>
                        <ItemFormField value={note.c} func={(field) => setNote({...note, c: field})} placeholder="Что привело именно к такой реакции?"/>
                        <ItemFormField value={note.b1} func={(field) => setNote({...note, b1: field})} placeholder="Как бы Вы хотели отреагировать на ситуацию?"/>
                        <ItemFormField value={note.c1} func={(field) => setNote({...note, c1: field})} placeholder="Что нужно сделать, чтобы получить желаемую реакцию?"/>
                        <Dropdown>
                            <Dropdown.Toggle>{catName}</Dropdown.Toggle>
                            <Dropdown.Menu>
                                {item.categories.map(category =>
                                    <Dropdown.Item
                                        onClick={e => changeCategory(category)}
                                        key={category.id}>
                                        {category.name}
                                    </Dropdown.Item>
                                )}
                            </Dropdown.Menu>
                        </Dropdown>
                        <div className="d-flex flex-row mt-3" style={{justifyContent: "space-around", width: "100%"}}>
                            <div style={{width: "45%"}}>
                                <Form.Label style={{marginTop: "10px", textAlign: "center"}}>Уровень самооценки до события</Form.Label>
                                <MarkSlider value={note.state_before} func={(field) => setNote({...note, state_before: field})} min={0} max={100}/>
                            </div>
                            <div style={{width: "45%"}}>
                                <Form.Label style={{marginTop: "10px", textAlign: "center"}}>Уровень самооценки после события</Form.Label>
                                <MarkSlider value={note.state_after} func={(field) => setNote({...note, state_after: field})} min={0} max={100} step={0.5}/>
                            </div>
                        </div>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={addNewNote}>{buttonName}</Button>
                    <Button variant="secondary" onClick={onHide}>Закрыть</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default CreateNote;