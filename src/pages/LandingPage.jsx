import React from 'react';
import { Text, Flex, Image } from '@chakra-ui/react';
import logo from '../assets/logo-horizontal-w.svg';
// import Navbar from '../components/landingPage/Navbar';
// import Hero from '../components/landingPage/Hero';
// import FeatureLeft from '../components/landingPage/FeatureLeft';
// import FeatureRight from '../components/landingPage/FeatureRight';
// import Pricing from '../components/landingPage/Pricing';
// import Footer from '../components/landingPage/Footer';

// const imageURL = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzSc0E_-ezcw1juku7x_q9rIVtGDEFGDsZnA&usqp=CAU';
// const featureItems = ['Lorem ipsum dolor sit amet', 'Lorem ipsum dolor sit amet', 'Lorem ipsum dolor sit amet'];

export default function LandingPage() {
  return (
    <>
      <Flex
        backgroundImage={'radial-gradient(circle farthest-corner at 100% 100%, rgba(122, 167, 255, 0.32), transparent 44%), radial-gradient(circle farthest-corner at 0% 100%, rgba(255, 1, 1, 0.15), transparent 32%)'} 
        backgroundColor="#1d1d1d" 
        direction="column" 
        minH="100vh" 
        h="100%">
        <Flex mt="15%" mb="8" px="6" h="20" alignItems="center" justifyContent="center">
          <Image maxW="300px" objectFit="contain" src={logo} />
        </Flex>
        <Text color="#8b9095" fontWeight={'medium'} fontSize={'lg'}>Coming soon...</Text>
      </Flex>
      {/* <Navbar />
      <Hero />
      <FeatureRight 
        heading="Lorem ipsum dolor sit amet, consetetu" 
        subheading="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore"
        image={imageURL}
        features={featureItems}
      />
      <FeatureLeft
        heading="Lorem ipsum dolor sit amet, consetetu" 
        subheading="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore"
        image={imageURL}
        features={featureItems}
      />
      <FeatureRight 
        heading="Lorem ipsum dolor sit amet, consetetu" 
        subheading="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore"
        image={imageURL}
        features={featureItems}
      />
      <Pricing />
      <Footer /> */}
    </>
  );
}
