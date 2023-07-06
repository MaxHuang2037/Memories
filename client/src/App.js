import React from 'react'
import { Container, AppBar, Typography, Grow, Grid} from '@mui/material'
import memories from './components/images/memories.png'

const App = () => {
    return(
        <Container maxWidth="lg">
            <AppBar position="static" color="inherit">
                <Typography variant="h2" aligh="center">Memories</Typography>
                <img src={memories} alt="memories"></img>
            </AppBar>
        </Container>
    )
}

export default App