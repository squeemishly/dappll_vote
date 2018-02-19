import React, { Component } from "react";
import getWeb3 from "../../utils/getWeb3";
import BallotContract from "../../../build/contracts/Ballot.json"
import c from "./Ballot.css";

class Ballot extends Component {
    state = {
      voted: false,
      votedFor: null,
      candidatesHex: [],
      candidates: [],
    }

    componentWillMount() {
      getWeb3
      .then(results => {
        this.setState({
          web3: results.web3
        })

        this.InstantiateContract()
      })
      .catch(() => {
        console.log("Error finding web3.")
      })
    }

    // componentDidMount() {
    //   getVoted(currentUser.Address)
    //   .then((result) => {
    //     this.setState({
    //       voted: result.data.voted,
    //       votedFor: result.data.votedFor
    //     })
    //   })
    // }

    InstantiateContract() {
      const contract = require('truffle-contract')
      const ballotContract = contract(BallotContract)
      ballotContract.setProvider(this.state.web3.currentProvider)

      let ballotContractInstance

      this.state.web3.eth.getAccounts((err, accounts) => {
        ballotContract.deployed()
        .then((instance) => {
          ballotContractInstance = instance

          return ballotContractInstance.getCandidates()
        })
        .then((result) => {
          this.setState({ candidatesHex: result })
        })
        .then(() => {
          let candidates = []
          this.state.candidatesHex.forEach((candidate) => {
            candidates.push(this.state.web3.toAscii(candidate))
          })
          this.setState({candidates: candidates})
          console.log(candidates);
        })
      })
    }

    // handleClick(id) {
    //   submitVote(id)
    //   .then((result) => {
    //     this.setState({voted = true})
    //   })
    // }

    renderCandidate() {
      return (
        <div>
          {this.state.candidates.map((candidate, index) =>
            <div className={c.candidateProfile} key={index}>
              <h1 className={c.candidateName}>{candidate}</h1>
              <button className={c.voteBtn} key={index} type="button">Vote</button>
            </div>
          )}
        </div>
      )
    }

    render() {
      return (
        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', aligncontent: 'center'}}>
          {this.renderCandidate()}
        </div>
      )
    }
}

export default Ballot;
