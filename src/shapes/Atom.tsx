import logo from "../images/logo.svg";
import { RandomPosition } from "../utils/RandomPosition";

export const Atom = () => {
  return <img className='spin' src={logo} alt='logo' width='250px' height='250px' />;
};

export const WrappedAtom = () => <RandomPosition><Atom/></RandomPosition>