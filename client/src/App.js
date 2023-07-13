import React, { useEffect } from 'react'
import { Container, AppBar, Typography, Grow, Grid} from '@mui/material'
import memories from './components/images/memories.png'
import Posts from "./components/Posts/Posts"
import Form from "./components/Forms/Form"
import { useDispatch } from 'react-redux'
import { getPosts } from './features/posts/postSlice'

const App = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getPosts())
    }, [])
    return(
        <Container maxWidth="lg">
            <AppBar position="static" color="inherit">
                <Typography variant="h2" align="center">Memories</Typography>
                <img src={memories} alt="memories" height="400"></img>
            </AppBar>
            <Grow in>
                <Container>
                    <Grid container justify="space-between" alignItems="stretch" spacing={3}>
                        <Grid item xs={12} sm={7}>
                            <Posts></Posts>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Form></Form>
                        </Grid>
                    </Grid>
                </Container>
            </Grow>
        </Container>
    )
}

export default App