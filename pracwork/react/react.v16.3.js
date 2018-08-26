//setState
this.setState((prevState,props)=>({
  count:prevState.count + 1 + props.increment
}))

//event  注意参数，event会是所传参数最后一位
<button onClick={(e) => this.handleClick(name,e)}></button>

//Composition组合组件
//props.children
function FancyBorder(props) {
  return (
    <div className={'FancyBorder FancyBorder-' + props.color}>
      {props.children}
    </div>
  );
}
render(){
  return <FancyBorder color="blue">
      <h1 className="Dialog-title">
        Welcome
      </h1>
</FancyBorder>
}
//props.left 也可是dom
function SplitPane(props) {
  return (
    <div className="SplitPane">
      <div className="SplitPane-left">
        {props.left}
      </div>
      <div className="SplitPane-right">
        {props.right}
      </div>
    </div>
  );
}

function App() {
  return (
    <SplitPane
      left={
        <Contacts />
      }
      right={
        <Chat />
      } />
  );
}


//return  an Array of elements
render(){
  return [
    <li key="a">first</li>,
    <li key="b">second</li>,
    <li key="c">third</li>,
    <li key="d">four</li>        
  ]
}

// callback回调函数 作为 props.children,可传参！！！ props.children也可以是函数竟然
function Repeat(props) {
  let items = [];
  for (let i = 0; i < props.numTimes; i++) {
    items.push(props.children(i));
  }
  return <div>{items}</div>;
}

function ListOfTenThings() {
  return (
    <Repeat numTimes={10}>
      {(index) => <div key={index}>This is item {index} in the list</div>}
    </Repeat>
  );
}

//ref 
//when: 1 managing focus, text selection, media playback
        // 2 triggering imperative animations
        // 3 itegrating with third-party DOM libraries
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();  //创建ref
  }
  render() {
    return <div ref={this.myRef} />;
  }
}

const node = this.myRef.current;    
      // node表示两种情况
      // 1 如果ref是html element，通过构造函数constructor创建，则次current就是underlying DOM
      // 2 如果ref是定义在组件上，则current属性指的是 此组件实例
      // 注：functional component 没有ref，因为它不是实例

      this.textInput.current.focus();  //使用
      // ref更新在 componentDidMount or componentDidUpdate之前
      this.textInput.current.focusTextInput();

//从父组件访问子组件 ref forwarding, 可以暴漏子组件的ref
// 最下下策才使用findDOMNode()
const FancyButton = React.forwardRef((props,ref)=>(   //第二个参数ref 这里指buttonref
  <button ref={ref} className="FuncyButton">{props.children}</button>
));
const buttonref = React.creactRef();   //此ref.current就是可以直接获取的button（Dom node）
<FancyButton ref={buttonref}>click me!</FancyButton>

//HOC forwardRef
function logProps(Component){
  class LogProps extends React.Component {
    componentDidUpdate(prevProps){
      console.log(prevProps,this.props)    //ref 不是props，而是类似key
    }
    render(){
      const {forwardedRef,...rest} = this.props;
      return <Component ref={forwardedRef} {...rest}/>
    }
  }
  return React.forwardRef((props,ref)=>{
    return <LogProps {...props} forwardedRef={ref}/>
  })
}
// 应用  logProps(<FancyButton ref={buttonref}>click me!</FancyButton>)

//ref callback
function CustomTextInput(props){
  return (
    <input ref={props.inputRef}/>
  )
}
class Parent extends React.Component {
  render(){
    return (
      <CustomTextInput
        inputRef={ref => this.inputElement = ref}/>
    )
  }
}

//FileInput
<form onSubmit={this.handleSubmit}>
  <input type="file" ref={input => this.fileInput = input}/>
  <button type="submit">submit</button>
</form>
handleSubmit = (event)=>{
  event.preventDefault();
  alert(this.fileInput.files[0].name)
}


//Optimizing Performance 性能优化
shouldComponentUpdate(){}
React.PureComponent{}   //shallow comparison
immutable.js


//Context: provides a way to share values like these between component without having to explicitly pass a prop through every level of the tree
const ThemeContext = React.createContext('light');  //create a context for the current theme (default 'light') 创建一个context，默认值为light
class App extends React.Component {
  render(){
    return (
      //provider 提供一个值为dark，在任意的组件都可访问它，
      <ThemeContext.Provider value="dark">           
        <Toolbar/>
      </ThemeContext.Provider>
    )
  }
}
function Tollbar(props){
  return (
    <div>
      <ThemeContext/>
    </div>
  )
}
function ThemeContext(props){
  return (
    //Consumer 在这里消费读取the current theme contect
    // React 会找到离这个最近的 theme Provider ，并使用她的值
    <ThemeContext.Consumer>
      {theme => <Button {...props} theme={theme}/>}
    </ThemeContext.Consumer>
  )
}
//NOTE：Stick to case where the same data needs to be accessed in many components at multiple levels,don`t use context just to avoid passing props a few levels down
//API
const {Provider,Consumer} = React.createContext(defaultValue);  //default只用于匹配Consumer匹配不到它上面的Provider时，当作默认值；！！！注意：如果provider的值时undefined，默认值不会生效，就用undefined
<Provider value={...}>{}</Provider>
<Consumer>{value=>{return React DOM}}</Consumer>  //这个value就是provider的value，如果没有找到provider，则是creactContext的default value
//不受 shouldComponentUpdate的管制
//例1
export const ThemeContext = React.createContext({
  theme: themes.dark,
  toggleTheme: () => {},
});
function ThemeTogglerButton() {
  return (
    <ThemeContext.Consumer>
      {({theme, toggleTheme}) => (
        <button
          onClick={toggleTheme}
          style={{backgroundColor: theme.background}}>
          Toggle Theme
        </button>
      )}
    </ThemeContext.Consumer>
  );
}
class App extends React.Component {
  constructor(props) {
    super(props);

    this.toggleTheme = () => {
      this.setState(state => ({
        theme:
          state.theme === themes.dark
            ? themes.light
            : themes.dark,
      }));
    };
    this.state = {
      theme: themes.light,
      toggleTheme: this.toggleTheme,
    };
  }
  render() {
    return (
      <ThemeContext.Provider value={this.state}>
        <ThemeTogglerButton />
      </ThemeContext.Provider>
    );
  }
}
//例2
const ThemeContext = React.createContext('light');
const UserContext = React.createContext({
  name: 'Guest',
});
class App extends React.Component {
  render() {
    const {signedInUser, theme} = this.props;
    return (
      <ThemeContext.Provider value={theme}>
        <UserContext.Provider value={signedInUser}>
          <Layout />
        </UserContext.Provider>
      </ThemeContext.Provider>
    );
  }
}

function Layout() {
  return (
    <div>
      <Sidebar />
      <Content />
    </div>
  );
}
// A component may consume multiple contexts
function Content() {
  return (
    <ThemeContext.Consumer>
      {theme => (
        <UserContext.Consumer>
          {user => (
            <ProfilePage user={user} theme={theme} />
          )}
        </UserContext.Consumer>
      )}
    </ThemeContext.Consumer>
  );
}
//例4
class Button extends React.Component {
  componentDidMount() {
    // ThemeContext value is this.props.theme
  }

  componentDidUpdate(prevProps, prevState) {
    // Previous ThemeContext value is prevProps.theme
    // New ThemeContext value is this.props.theme
  }

  render() {
    const {theme, children} = this.props;
    return (
      <button className={theme ? 'dark' : 'light'}>
        {children}
      </button>
    );
  }
}

export default props => (
  <ThemeContext.Consumer>
    {theme => <Button {...props} theme={theme} />}
  </ThemeContext.Consumer>
);

//例5 HOC结合
const ThemeContext = React.createContext('light')
export function withThemeHOC = (Component)=>{
  return function(props){
    return (
      <ThemeContext.Consumer>
        {theme => <Component {...props} theme={theme} />}
      </ThemeContext.Consumer>
    )
  }
}
function Button({theme,...rest} = props){
  return <button className={props.theme} {...rest}></button>
}
const ThemeButton = withTheme(Button);

//例6  forwardRef 和 context
const ButtonTheme =  React.forwardRef((props,ref) => (
  <ThemeContext.Consumer>
    {theme =>(
      <FancyButton {...props} theme={theme} ref={ref}/>
    )}
  </ThemeContext.Consumer>
))

const ref = React.creactRef();
<ButtonTheme ref={ref} onClick={handleClick}>click me!</ButtonTheme>


//Fragments : let you group a list of children without adding extra nodes to the DOM
class Columns extends React.Component {
  render() {
    return (
      <React.Fragment>
        <td>Hello</td>
        <td>World</td>
      </React.Fragment>
    );
  }
}
//例
function Glossary(props) {
  return (
    <dl>
      {props.items.map(item => (
        // Without the `key`, React will fire a key warning
        <React.Fragment key={item.id}>
          <dt>{item.term}</dt>
          <dd>{item.description}</dd>
        </React.Fragment>
      ))}
    </dl>
  );
}


//Portals： 脱离DOM树，另提供一个children渲染到DOM节点，与root想独立。
ReactDOM.createPortal(child,container)
render(){
  return ReactDOM.createPortal(
    this.props.children,
    domNode
  );
}
//如：dialogs,hovercards,tooltips
//例
<html>
  <body>
    <div id="app-root"></div>
    <div id="modal-root"></div>
  </body>
</html>

const appRoot = document.getElementById('app-root');
const modalRoot = document.getElementById('modal-root');
class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.el = document.createElement('div');
  }

  componentDidMount() {
    modalRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    modalRoot.removeChild(this.el);
  }

  render() {
    return ReactDOM.createPortal(
      this.props.children,
      this.el,
    );
  }
}
class Parent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {clicks: 0};
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.setState(prevState => ({
      clicks: prevState.clicks + 1
    }));
  }

  render() {
    return (
      <div onClick={this.handleClick}>
        <Modal>
          <button>Click</button>
        </Modal>
      </div>
    );
  }
}
ReactDOM.render(<Parent/>,appRoot)


//Error Boundaries:catch errors during rendering、lifecycle methods;do not catch event handlers、setTimeout、server side rendering
componentDidCatch(error,info) {}  
//note! 任何没有被捕获的错误将导致组件树卸载
componentDidCatch (error: Error, errorInfo: React.ErrorInfo) {
  this.setState({ remounting: true }, () => {
    setImmediate(() => {
      this.setState({ remounting: false })
    })
  })
}


//Render Props: value is a function that returns a react element , share the state between component
<DataProvider render={data => (
  <h1>Hello {data.target}</h1>
)}/>
//例
class Cat extends React.Component {
  render() {
    const mouse = this.props.mouse;
    return (
      <img src="/cat.jpg" style={{ position: 'absolute', left: mouse.x, top: mouse.y }} />
    );
  }
}

class Mouse extends React.Component {
  constructor(props) {
    super(props);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.state = { x: 0, y: 0 };
  }
  
  handleMouseMove(event) {
    this.setState({
      x: event.clientX,
      y: event.clientY
    });
  }
  
  render() {
    return (
      <div style={{ height: '100%' }} onMouseMove={this.handleMouseMove}>

        {/*
          Instead of providing a static representation of what <Mouse> renders,
          use the `render` prop to dynamically determine what to render.
        */}
        {this.props.render(this.state)}
      </div>
    );
  }
}

class MouseTracker extends React.Component {
  render() {
    return (
      <div>
        <h1>Move the mouse around!</h1>
        <Mouse render={mouse => (
          //这里就可以拿到（x,y）state
          <Cat mouse={mouse} />
        )}/>
      </div>
    );
  }
}

//转成HOC
function withMouse(Component) {
  return class extends React.Component {
    render(){
      reutrn (
        <Mouse render={(mouse)=>(
          <Component {...this.props} mouse={mouse}/>
        )}/>
      )
    }
  }
}
//note
<Mouse children={mouse => (
  <p>The mouse position is {mouse.x}, {mouse.y}</p>
)}/>
<Mouse>
  {mouse => (
    <p>The mouse position is {mouse.x}, {mouse.y}</p>
  )}
</Mouse>
Mouse.propTypes = {
  children: PropTypes.func.isRequired
};
//不能在React.pureComponent{}里用,因为每次render会生成新的值，而浅比较会对新值返回false
//可以改写成
class MouseTracker extends React.Component {
  // Defined as an instance method, `this.renderTheCat` always
  // refers to *same* function when we use it in render
  renderTheCat(mouse) {
    return <Cat mouse={mouse} />;
  }

  render() {
    return (
      <div>
        <h1>Move the mouse around!</h1>
        <Mouse render={this.renderTheCat} />
      </div>
    );
  }
}


// 生命周期
//Mounting
constructor(props){
  super(props)
}
static getDerivedStateFromProps(nextProps,prevState)
componentWillMount()
render()
componentDidMount()

//Updating
componentWillReceiveProps(nextProps)
static getDerivedStateFromProps()
shouldComponentUpdate(nextProps,nextState)  //建议用pureComponent,也不建议在此做深度比较
componentWillUpdate()
render()
getSnapshotBeforeUpdate(prevProps,prevState)
componentDidUpdate(prevProps,prevState,snapshot)

//Unmounting
componentWillUnmount()

//Error Handling
componentDidCatch(err,info)

//API
setState((prevState,props)=>{
  return {counter: prevState.counter + props.step}
},()=>{})
forceUpdate(callback)

// class Properties
defaultProps
displayName

//Instance Properties
props
state






static getDerivedStateFromProps(nextProps, prevState)  //每次实例化之后都会被调用

//状态更改之前捕获，并把返回的值传给didUpdate
getSnapshotBeforeUpdate(prevProps, prevState) {
  // Are we adding new items to the list?
  // Capture the scroll position so we can adjust scroll later.
  if (prevProps.list.length < this.props.list.length) {
    const list = this.listRef.current;
    return list.scrollHeight - list.scrollTop;
  }
  return null;
}

componentDidUpdate(prevProps, prevState, snapshot) {
  // If we have a snapshot value, we've just added new items.
  // Adjust scroll so these new items don't push the old ones out of view.
  // (snapshot here is the value returned from getSnapshotBeforeUpdate)
  if (snapshot !== null) {
    const list = this.listRef.current;
    list.scrollTop = list.scrollHeight - snapshot;
  }
}

// isMounted() 判断异步函数已在willUnmonut的时停止setState，已被废弃，更改如下(官网推荐如下)
componentDidMount(){
  this.serverRequest = $.get(URL,function(res) {
    this.setState({})
  }).bind(this)
}

componentWillUnmount(){
  this.serverRequest.abort()
}