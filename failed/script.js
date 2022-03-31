const HeadingComponent = props => /*#__PURE__*/React.createElement("h1", null, props.data);

const ParagaphComponent = props => /*#__PURE__*/React.createElement("p", null, props.data);

class AsyncComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      resolvedError: false,
      resolvedSuccess: false,
      data: '',
      error: '' };

    this.renderChildren = this.renderChildren.bind(this);
  }

  componentDidMount() {
    this.props.promise().
    then(data => this.setState({ resolvedSuccess: true, data })).
    catch(error => this.setState({ resolvedError: true, error }));
  }

  renderChildren() {
    return React.Children.map(this.props.children, (child) =>
    React.cloneElement(child, {
      data: this.state.data }));


  }

  render() {
    if (this.state.resolvedError) {
      return /*#__PURE__*/React.createElement("h1", null, "Error Encountered");
    } else if (this.state.resolvedSuccess) {
      return /*#__PURE__*/React.createElement("div", null, this.renderChildren());
    } else {
      return /*#__PURE__*/React.createElement("h1", null, "Loading...");
    }
  }}


const HeadingAPI = () => new Promise((resolve, reject) => {
  setTimeout(() => reject('Heading'), 5000);
});

const ParagraphAPI = () => new Promise((resolve, reject) => {
  setTimeout(() => resolve('Seems like your internet speed is bad, try agine later'), 2000);
});

const App = () => /*#__PURE__*/
React.createElement("div", null, /*#__PURE__*/
React.createElement(AsyncComponent, { promise: HeadingAPI }, /*#__PURE__*/
React.createElement(HeadingComponent, null)), /*#__PURE__*/

React.createElement(AsyncComponent, { promise: ParagraphAPI }, /*#__PURE__*/
React.createElement(ParagaphComponent, null)));




ReactDOM.render( /*#__PURE__*/React.createElement(App, null), document.getElementById("app"));