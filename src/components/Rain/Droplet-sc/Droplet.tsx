import styled from 'styled-components';



const Droplet = styled.div`
   /* Constants */
   position: absolute;
  /* margin-left: 7px; */
  /* Customizable */
    /* background = color of each droplet; Look into webkit/moz 
       potentially a rainbow rain effect can be achieved by assign each droplet a different color for a set of 
       colors that complement each other.
       Background transparency adds an effect that makes the rain lighter than 1px and seem more far away
    */
    /* background:-webkit-gradient(linear,0% 0%,0% 100%, from(rgba(13,52,58,1) ), to(rgba(255,255,255,0.5))  );
    background: -moz-linear-gradient(top, rgba(13,52,58,1) 0%, rgba(255,255,255,.5) 100%); */
    /* background-color: rgb(183, 212, 255); */
    background: linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.25));

    /* Width and height should have a max value as they cease to look like droplets after a certain point */
    width: 1px;
    height: 60%;
    margin-left: 7px;    

    -webkit-animation: droplet .5s linear infinite;
    -moz-animation: droplet .5s linear infinite;
  
  @keyframes droplet {
    0% {
      opacity: 1;
    }
    65% {
      opacity: 1;
    }
    75% {
      opacity: 0;
    }
    100% {
      opacity: 0;
    }
  }

  /* drop animation styles */
  /* @-webkit-keyframes fall {
      to {margin-top:100px;}
  }
  @-moz-keyframes fall {
      to {margin-top:900px;}
  } */
`;



export default Droplet