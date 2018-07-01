// h1 p div button input
const Title = styled.h1`
font-size: 1.5em;
text-align: center;
`
// props
const Button = styled.button`
  background: ${props => props.primary ? 'black' : 'red'};
  font-size: 1em;
`

// 包裹组件
const Link = ({className,children}) => (
  <a className={className}>
    {children}
  </a>
)
const StyledLink = styled(Link)`
  color: red;
`

// extend
const Button = styled.button`
  color: red;
  font-size: 1rem;
`
const TomatoButton = Button.extend`
  color: tomato;
`
// withComponent
const Button = styled.button`
  color: red;
  font-size: 1rem;
`
const Link = Button.withComponent('a') // 改变 Button 为 a tag
const TomatoLink = Link.extend`
  color: tomato;
`
// attrs 和 define static props
const Input = styled.input.attrs({
  type: 'password',
  margin: props => props.size || '1em',
  padding: props => props.size || '1em'
})`
  color: black;
  font-size: 1em;
  border: 2px solid #ccc;
  margin: ${props => props.margin}
  padding: ${props => props.padding}
`

// animation
const rotate360 = keyframes`
  from {
    transfrom: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`
const Rotate = styled.div`
  display: inline-block;
  animation: ${rotate360} 2s linear infinite;
  padding: 2rem 1rem;
  font-size: 1.2rem;
`
// ThemeProvider
const Button = styled.button`
  color: ${props => props.theme.fg}
  border: 2px solid ${props => props.theme.fg}
`
const theme = {
  fg: 'palevioletred',
  bg: 'white'
};

const invertTheme = ({fg, bg}) => ({
  fg: bg,
  bg: fg
});

render(
  <ThemeProvider theme={theme}>
    <div>
      <Button>Default Theme</Button>
      <ThemeProvider theme={invertTheme}>
        <Button>inverted Theme</Button>
      </ThemeProvider>
    </div>
  </ThemeProvider>
)

// @media
const Content = styled.div`
  background: red;
  height: 3em;
  width: 3em;

  @media (max-width: 700px) {
    background: red;
  }
`
render(
  <Content/>
)

// css
import styled, { css } from 'styled-components';
const complexMixin = css`
  color: ${props => props.whiteColor ? 'white' : 'black'}
`
const StyledComp = styled.div`
  ${props => props.complex ? complexMixin : 'color: blue;'}
`

// injectGlobal
import { injectGlobal } from 'styled-components';
import reactV163 from './react.v16.3';
injectGlobal`
  @font-face {
    font-family: 'Operator Mono',
    src: url('../fonts/Operator-Mono.ttf')
  }
  body {
    margin: 0;
  }
`
// isStyledComponent
const shouldUseInnerRef = isStyledComponent(MaybeStyledComponent);
class MyComponent extends react.Component {
  componentDidMount() {

  }
  render() {
    return React.createElement(
      MaybeStyledComponent, {
        [shouldUseInnerRef ? 'innerRef' : 'ref'] : node => { this.el = node }
      }
    )
  }
}