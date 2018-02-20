import React, { Component } from "react";
import getWeb3 from "../../utils/getWeb3";
import BallotContract from "../../../build/contracts/Ballot.json";
import { connect } from "react-redux";
import c from "./Ballot.css";

class Ballot extends Component {
  state = {
    candidates: [],
    web3: null
  };

  componentWillMount() {
    console.log("Ballot Component");
    getWeb3
      .then(results => {
        this.setState({
          web3: results.web3
        });

        this.InstantiateContract();
      })
      .catch(() => {
        console.log("Error finding web3.");
      });
  }

  InstantiateContract() {
    const contract = require("truffle-contract");
    const ballotContract = contract(BallotContract);
    ballotContract.setProvider(this.state.web3.currentProvider);

    let ballotContractInstance;

    this.state.web3.eth.getAccounts((err, accounts) => {
      ballotContract
        .deployed()
        .then(instance => {
          ballotContractInstance = instance;

          return ballotContractInstance.getNumCandidates();
        })
        .then(result => {
          let candidates = [];

          for (let i = 0; i < result; i++) {
            candidates.push(ballotContractInstance.getCandidate(i));
          }

          Promise.all(candidates).then(values => {
            const candidates = values.map(candidate => {
              return [
                this.state.web3.toAscii(candidate[0]),
                this.state.web3.toAscii(candidate[1])
              ];
            });

            this.setState({ candidates });
          });
        });
    });
  }

  renderCandidate() {
    return (
      <div>
        <h1>{this.props.user.name}</h1>
        {this.state.candidates.map((candidate, index) => (
          <div className={c.candidateProfile} key={index}>
            <h1 className={c.candidateName}>{candidate[0]}</h1>
            <h3 className={c.candidateName}>{candidate[1]}</h3>
            <button className={c.voteBtn} key={index} type="button">
              Vote
            </button>
          </div>
        ))}
      </div>
    );
  }

  render() {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          aligncontent: "center"
        }}
      >
        {this.renderCandidate()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user
  }
}

export default connect(mapStateToProps)(Ballot);
