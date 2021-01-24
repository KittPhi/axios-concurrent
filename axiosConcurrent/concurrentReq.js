class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        data: {},
        permissions: {},
      },
    };
  }

  getUserData = async () => {
    try {
      const { data } = await axios.get(
        `${ROOT_URL}/profile/${this.props.activeUserId}`
      );
      return data;
    } catch (err) {
      console.log(err.message);
    }
  };

  getPermissions = async () => {
    try {
      const { data } = await axios.get(
        `${ROOT_URL}/permissions/${this.props.activeUserId}`
      );
      return data;
    } catch (err) {
      console.log(err.message);
    }
  };

  async componentDidMount() {
    const userData = await this.getUserData();
    const userPermissions = await this.getPermissions();
    this.setState(
      (user: {
        data: userData,
        permissions: userPermissions,
      })
    );
  }

  render() {
    return (
      <div className="container">
        {this.state.posts && this.state.posts.length !== 0 ? (
          this.state.posts.map((post) => (
            <Card title={post.title}>{post.content}</Card>
          ))
        ) : (
          <Loading />
        )}
      </div>
    );
  }
}
