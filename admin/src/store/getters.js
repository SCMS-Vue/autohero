const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  client: state => state.user.client,
  options: state => state.user.options,
  name: state => state.user.name
}
export default getters
