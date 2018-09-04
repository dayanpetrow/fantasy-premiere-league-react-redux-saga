import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions/actions";
import * as urls from "../../constants/urls";
import Loader from "../Loader/Loader";
import PlayersTable from "../PlayersTable/PlayersTable";
import Select from "react-select";
import "./PlayersPage.css";
import { androidAdd } from "react-icons-kit/ionicons/androidAdd";
import { sort } from "react-icons-kit/fa/sort";
import { target } from "react-icons-kit/iconic/target";
import { Icon } from "react-icons-kit";
import { DebounceInput } from "react-debounce-input";
import { playersPageFilterByName } from "../../utils/utils";

class PlayersPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      findPlayerText: "",
      searchActive: false,
      results_count: 12,
      search_results: [],
      players: [],
      sort_options: [],
      filter_positions: [],
      selectedSort: { label: "Total score", value: "total_points" },
      selectedPosition: { label: "All", value: 5 }
    };
  }

  componentDidMount() {
    this.props.changeView();
  }

  loadMorePlayers = () => {
    this.setState(function(state) {
      return {
        ...state,
        results_count: state.results_count + 12
      };
    });
  };

  findPlayer = event => {
    const do_query = event.target.value.replace(" ", "").toLowerCase();
    this.setState({ findPlayerText: do_query });
    const { players } = this.state;
    console.log(do_query);
    if (do_query !== "") {
      this.setState(function(state) {
        return {
          ...state,
          search_results: players.filter(player =>
            playersPageFilterByName(player, do_query)
          ),
          searchActive: true
        };
      });
    } else {
      this.setState(function(state) {
        return {
          ...state,
          search_results: [],
          searchActive: false
        };
      });
    }
  };

  handleSortChange = selectedOption => {
    const { players, search_results } = this.state;
    this.setState({ selectedSort: selectedOption });
    this.setState(function(state) {
      return {
        ...state,
        players: players.sort(
          (a, b) => b[selectedOption.value] - a[selectedOption.value]
        ),
        search_results: search_results.sort(
          (a, b) => b[selectedOption.value] - a[selectedOption.value]
        )
      };
    });
  };

  handlePositionChange = selectedOption => {
    const { selectedSort, findPlayerText } = this.state;
    this.setState(function(state) {
      return {
        ...state,
        selectedPosition: selectedOption,
        results_count: 12,
        players: this.props.response.elements
          .filter(player => player.element_type === selectedOption.value)
          .sort((a, b) => b[selectedSort.value] - a[selectedSort.value]),
        search_results: this.props.response.elements
          .filter(player => player.element_type === selectedOption.value)
          .sort((a, b) => b[selectedSort.value] - a[selectedSort.value])
          .filter(player => playersPageFilterByName(player, findPlayerText))
      };
    });
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log("getDerivedStateFromProps");
    if (
      nextProps.response &&
      nextProps.response.elements &&
      prevState.players.length === 0
    ) {
      console.log("getDerivedStateFromProps goes into the IF");

      const { stats_options } = nextProps.response; //sort options for react-select
      let sort_options = stats_options.map(option => {
        return { label: option.name, value: option.key };
      });

      const { element_types: positions } = nextProps.response; //filter options for react-select
      let position_options = positions.map(option => {
        return { label: option.plural_name, value: option.id };
      });

      position_options = [{ label: "All", value: 5 }, ...position_options];
      sort_options = [{ label: "Options", value: null }, ...sort_options];

      return {
        players: nextProps.response.elements.sort(
          (a, b) => b.total_points - a.total_points
        ),
        sort_options: sort_options,
        filter_positions: position_options
      };
    }
    return null;
  }

  render() {
    if (!this.props.response) {
      return <Loader />;
    }

    const { element_types: positions, teams } = this.props.response;
    const {
      players,
      sort_options,
      filter_positions,
      selectedSort,
      selectedPosition,
      results_count,
      searchActive,
      search_results
    } = this.state;

    return (
      <div>
        <div className="PlayersPage">
          <div className="column">
            <div className="block">
              <div className="block-header">
                <h3 className="block-header__title">
                  <Icon
                    size={"24px"}
                    icon={target}
                    className="players-page__icon"
                  />
                  Position
                </h3>
              </div>
              <div className="content">
                <Select
                  value={selectedPosition}
                  onChange={this.handlePositionChange}
                  options={filter_positions}
                />
              </div>
            </div>
          </div>
          <div className="column">
            <div className="block">
              <div className="block-header">
                <h3 className="block-header__title">
                  <Icon
                    size={"24px"}
                    icon={sort}
                    className="players-page__icon"
                  />{" "}
                  Sort by
                </h3>
              </div>
              <div className="content">
                <Select
                  value={selectedSort}
                  onChange={this.handleSortChange}
                  options={sort_options}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="players-search-debounce-wrapper">
          <DebounceInput
            minLength={1}
            debounceTimeout={750}
            type="text"
            placeholder="Search here..."
            className="players-search-debounce"
            onChange={this.findPlayer}
          />
        </div>
        <PlayersTable
          data={searchActive ? search_results : players}
          teams={teams}
          positions={positions}
          results_count={results_count}
        />
        <div className="loadmore">
          <button
            onClick={this.loadMorePlayers}
            disabled={players.length <= results_count ? true : false}
          >
            {" "}
            <Icon
              size={"24px"}
              icon={androidAdd}
              className="players-page__icon"
            />{" "}
            Load more{" "}
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    response: state.response,
    error: state.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeView: () =>
      dispatch({
        type: actions.CHANGE_ACTIVE_VIEW,
        activeView: urls.PLAYERS_PAGE
      })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayersPage);
