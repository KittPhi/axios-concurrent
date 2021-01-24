class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: { 
                data: {}, 
                permissions: {} 
            }
        };
    }

    async componentDidMount() {
        const URLs = [ `${ROOT_URL}/profile/${this.props.activeUserId}`, `${ROOT_URL}/permissions/${this.props.activeUserId}` ];
        
        const requests = URLs.map(URL => axios.get(URL).catch(err => null));

        try {
            const [userData, userPermissions] = await axios.all(requests);
            this.setState(
                user: {
                    data: userData && userData.data,
                    permissions: userPermissions && userPermissions.data
                }
            );
        }
        catch (err) {
            console.log(err.message);
        }
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
