import { Box } from '@mui/material'
import { Oval } from 'react-loader-spinner'

const OvalCircle = () => (
    <Box className='flex items-center justify-center h-screen '>
        <Oval
            ariaLabel="loading-indicator"
            height={180}
            width={180}
            strokeWidth={4}
            strokeWidthSecondary={2}
            color='#4AC3BF'
            secondaryColor="white"
        />
    </Box>
)

export default OvalCircle

