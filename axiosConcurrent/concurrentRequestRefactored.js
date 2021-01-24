class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
    };
  }

  async componentDidMount() {
    try {
      const { data } = await axios.get(`${ROOT_URL}/posts`);
      this.setState({
        posts: data,
      });
    } catch (err) {
      console.log(err.message);
    }
  }

  render() {
    return (
      <div className="container">
        {this.state.posts && this.state.posts.length !== 0 ? (
          this.state.posts.map((post, index) => {
            const { title, content } = post;
            return <Card title={title}>{content}</Card>;
          })
        ) : (
          <Loading />
        )}
      </div>
    );
  }
}
