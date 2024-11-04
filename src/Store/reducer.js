import { reducerCases } from './constants';

export const intialState = {
  token: null,
  userInfo: null,
  selectedPlaylist: null,
  selectedAlbum: null,
  currentlyPlaying: null,
  playerState: false,
  view: 'HOME',
  selectedPlaylistId: '52qHUoIdaS14dVEu0Q4Qpc',
  selectedAlbumInfo: {},
  artistsData: [],
  playlists: [],
  featuredPlaylist: [],
  newReleases: [],
  searchData: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case reducerCases.SET_TOKEN: {
      return {
        ...state,
        token: action.token,
      };
    }
    case reducerCases.SET_PLAYLISTS: {
      return {
        ...state,
        playlists: action.playlists,
      };
    }
    case reducerCases.SET_USER: {
      return {
        ...state,
        userInfo: action.userInfo,
      };
    }
    case reducerCases.SET_ARTIST: {
      return {
        ...state,
        artistsData: action.artistsData,
      };
    }
    case reducerCases.SET_PLAYLIST: {
      return {
        ...state,
        selectedPlaylist: action.selectedPlaylist,
      };
    }
    case reducerCases.SET_PLAYING: {
      return {
        ...state,
        currentlyPlaying: action.currentlyPlaying,
      };
    }
    case reducerCases.SET_VIEW: {
      return {
        ...state,
        view: action.view,
      };
    }
    case reducerCases.SET_SELECTED_PLAYLISTID: {
      return {
        ...state,
        selectedPlaylistId: action.selectedPlaylistId,
      };
    }
    case reducerCases.SET_FEATURED_PLAYLISTS: {
      return {
        ...state,
        featuredPlaylist: action.featuredPlaylist,
      };
    }
    case reducerCases.SET_NEW_RELEASES: {
      return {
        ...state,
        newReleases: action.newReleases,
      };
    }
    case reducerCases.SET_SELECTED_ALBUM: {
      return {
        ...state,
        selectedAlbum: action.selectedAlbum,
      };
    }
    case reducerCases.SET_SELECTED_ALBUM_INFO: {
      return {
        ...state,
        selectedAlbumInfo: action.selectedAlbumInfo,
      };
    }
    case reducerCases.SET_SEARCH_DATA: {
      return {
        ...state,
        searchData: action.searchData,
      };
    }
    case reducerCases.SET_PLAYER_STATE: {
      return {
        ...state,
        playerState: action.playerState,
      };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
