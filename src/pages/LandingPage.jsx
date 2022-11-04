import React from 'react';
import Navbar from '../components/landingPage/Navbar';
import Hero from '../components/landingPage/Hero';
import FeatureLeft from '../components/landingPage/FeatureLeft';
import FeatureRight from '../components/landingPage/FeatureRight';
import Pricing from '../components/landingPage/Pricing';
import Footer from '../components/landingPage/Footer';

const imageURL = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzSc0E_-ezcw1juku7x_q9rIVtGDEFGDsZnA&usqp=CAU';
const featureItems = ['Lorem ipsum dolor sit amet', 'Lorem ipsum dolor sit amet', 'Lorem ipsum dolor sit amet'];

export default function LandingPage() {
  return (
    <>
      <Navbar />
      {/* <Hero /> */}
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
      {/* <Pricing />
      <Footer /> */}
    </>
  );
}
