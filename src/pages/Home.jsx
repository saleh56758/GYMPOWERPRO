import Hero from '../components/Hero';
import Membership from '../components/Membership';
import Schedule from '../components/Schedule';
import Trainers from '../components/Trainers';
import Tools from '../components/Tools';
import Testimonials from '../components/Testimonials';
import Blog from '../components/Blog';
import Contact from '../components/Contact';

function Home() {
  return (
    <>
      <Hero />
      <Membership />
      <Schedule />
      <Trainers />
      <Tools />
      <Testimonials />
      <Blog />
      <Contact />
    </>
  );
}

export default Home;