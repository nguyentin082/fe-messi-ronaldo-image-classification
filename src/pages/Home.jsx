import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { SiGooglecolab } from 'react-icons/si';
import { PiPlayFill } from 'react-icons/pi';

const Home = () => {
    return (
        <div
            className="homepage-bgimage d-flex justify-content-center align-items-center"
            style={{ height: '100vh' }}
        >
            <Container className="glass-container d-flex flex-column justify-content-center align-items-center text-center p-5">
                <h1 className="display-4 fw-bold">Messi or Ronaldo?</h1>
                <h1 className="display-4 fw-bold">Let AI Decide!</h1>
                <p className="">
                    AI-powered model goes beyond image classification. Try it
                    now in Playground.
                </p>
                <div>
                    <Button
                        variant="success"
                        className="me-2"
                        href="https://colab.research.google.com/drive/1n_ktaqsGBQhiA42YHBD9OSYzzf1DWUiH?usp=sharing"
                    >
                        <SiGooglecolab className="me-2" />
                        Google Colab
                    </Button>
                    <Button variant="primary" href="/playground">
                        <PiPlayFill className="me-2" />
                        Playground
                    </Button>
                </div>
            </Container>
        </div>
    );
};

export default Home;
