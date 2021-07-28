import { auth, sb } from '@/api/supabase'
import { getToken, setToken, removeToken, getUser, setUser, removeUser } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    user: getUser(),
    name: '',
    avatar: '',
    client: '',
    options: {},
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_USER: (state, user) => {
    state.user = user
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_OPTIONS: (state, options) => {
    state.options = options
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_CLIENT: (state, client) => {
    state.client = client
  }
}

const actions = {
  signup({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      const { username, password } = userInfo
      auth.signUp({
        email: username,
        password: password
      }).then((data) => {
        if (data.error === null) {
          const userid = data.user.email.split('@')[0]
          const newuser = {
            id: data.user.id,
            username: userid,
            avatar: `https://avatar.oxro.io/avatar.svg?name=${userid.toUpperCase()}&background=ff6b6b&caps=3&bold=true`,
            token: 'user-token',
            client: 'https://www.google.com/',
            options: {
              bankName: '',
              beneficiary: '',
              iban: '',
              bic: '',
            }
          }
          sb.from('profiles').insert([newuser]).then((response) => {
            console.log('response', response)
            commit('SET_USER', data.user)
            setUser(data.user)
            commit('SET_TOKEN', 'admin-token')
            setToken('admin-token')
            resolve()
          })
        } else {
          reject(data.error)
        }
      })
    })
  },
  login({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      const { username, password } = userInfo
      auth.signIn({
        email: username,
        password: password
      }).then((data) => {
        if (data.error === null) {
          commit('SET_USER', data.user)
          sb.from('profiles').select()
          .eq('id', data.user.id).then((response) => {
            response.data[0]
            data.user.options = response.data[0].options
            data.user.client = response.data[0].client
            setUser(data.user)
            commit('SET_TOKEN', 'admin-token')
            setToken('admin-token')
            resolve()
          })
        } else {
          reject(data.error)
        }
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      sb.from('profiles').select().eq('id', state.user.id)
        .then((data) => {
          if (data.error === null) {
            commit('SET_NAME', data.data[0].username)
            commit('SET_AVATAR', data.data[0].avatar)
            commit('SET_CLIENT', data.data[0].client)
            commit('SET_OPTIONS', data.data[0].options)
            resolve(data.data[0])
          } else {
            reject('Verification failed, please Login again.')
          }
        })
    })
  },
  getClient({commit, state}) {

  },
  // user logout
  logout({ commit }) {
    return new Promise((resolve) => {
      removeToken() // must remove  token  first
      removeUser()
      resetRouter()
      commit('RESET_STATE')
      resolve()
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

