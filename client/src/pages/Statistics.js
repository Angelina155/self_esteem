import { Container, Spinner } from "react-bootstrap";
import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useState } from "react";

import { getMarks } from "../http/itemAPI";
import { AppContext } from '../components/AppContext';
import Stability from "../components/Stability";
import LevelPlot from "../components/LevelPlot";



const Statistics = observer(() => {
    const { user } = useContext(AppContext);
    const [marks, setMarks] = useState([])
    const [isFetching, setIsFetching] = useState(false)


    useEffect(() => {
        fetchMarks()
    }, [])

    async function fetchMarks() {
        setIsFetching(true)
        const data = await getMarks(user.id)
        setMarks(data.rows)
        setIsFetching(false)
    }

    return (
        <Container>
            {isFetching
                ? <Spinner animation="border" role="status"/>
                : marks.length > 1 ? (
                        <div>
                            <Stability marks={marks.map(p => p.mark)}/>
                            <LevelPlot marks = {marks}/>
                        </div>
                    ) : (
                        <h3>Для отслеживания прогресса необходимо пройти диагностику хотя бы два раза</h3>
                    )
            }
        </Container>
    );
});

export default Statistics
