import { Container } from 'react-bootstrap';
import { TbError404 } from 'react-icons/tb';

const NoPage = () => {
    return (
        <div
            className="homepage-bgimage d-flex justify-content-center align-items-center"
            style={{ height: '100vh' }}
        >
            <Container className="glass-container d-flex flex-column justify-content-center align-items-center text-center p-5">
                <TbError404 className="me-2" size="200" />

                <h1 className="display-5 fw-bold mb-3">
                    Oops, this page not found.
                </h1>
            </Container>
        </div>
    );
};

export default NoPage;
