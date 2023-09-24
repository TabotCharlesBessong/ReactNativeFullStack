```Javascript
const SideBar = () => {
return (
  <div className="relative bg-darkslateblue w-full h-[696.06rem] overflow-hidden flex flex-col items-center justify-start gap-[19.5rem] text-left text-[8.13rem] text-steelblue-100 font-inter">
      <img className="relative w-[179.88rem] h-[44.25rem] overflow-hidden shrink-0 z-[0]" alt="" src="sidebar header.svg" />
      <div className="relative w-[161.5rem] h-[29.5rem] overflow-hidden shrink-0 z-[1]">
          <b className="absolute top-[7.63rem] left-[30.38rem] flex items-center w-[55rem] h-[12rem]">Dashboard</b>
          <img className="absolute h-[27.75%] w-[3.49%] top-[32.42%] right-[12.92%] bottom-[39.83%] left-[83.59%] max-w-full overflow-hidden max-h-full" alt="" src={`🦆 icon "chevron right".svg`} />
          <img className="absolute h-[42.37%] w-[8.85%] top-[24.15%] right-[87.79%] bottom-[33.47%] left-[3.37%] max-w-full overflow-hidden max-h-full" alt="" src={`🦆 icon "home".svg`} />
      </div>
      <div className="relative w-[161.5rem] h-[29.5rem] overflow-hidden shrink-0 z-[2]">
          <b className="absolute top-[7.63rem] left-[30.38rem] flex items-center w-[55rem] h-[12rem]">Clients</b>
          <img className="absolute h-[27.75%] w-[3.49%] top-[32.42%] right-[12.92%] bottom-[39.83%] left-[83.59%] max-w-full overflow-hidden max-h-full" alt="" src={`🦆 icon "chevron right".svg`} />
          <img className="absolute top-[8.75rem] left-[5.56rem] w-[12.5rem] h-[12.5rem] overflow-hidden" alt="" src="client.svg" />
      </div>
      <div className="relative w-[161.5rem] h-[29.5rem] overflow-hidden shrink-0 z-[3]">
          <b className="absolute top-[7.63rem] left-[30.38rem] flex items-center w-[55rem] h-[12rem]">Admins</b>
          <img className="absolute h-[27.75%] w-[3.49%] top-[32.42%] right-[12.92%] bottom-[39.83%] left-[83.59%] max-w-full overflow-hidden max-h-full" alt="" src={`🦆 icon "chevron right".svg`} />
          <img className="absolute h-[42.37%] w-[7.74%] top-[28.39%] right-[86.3%] bottom-[29.24%] left-[5.96%] max-w-full overflow-hidden max-h-full" alt="" src="Group.svg" />
      </div>
      <div className="relative bg-steelblue-200 w-[161.5rem] h-[29.5rem] overflow-hidden shrink-0 z-[4]">
          <b className="absolute top-[7.63rem] left-[30.38rem] flex items-center w-[55rem] h-[12rem]">Users</b>
          <img className="absolute h-[27.75%] w-[3.49%] top-[32.42%] right-[12.92%] bottom-[39.83%] left-[83.59%] max-w-full overflow-hidden max-h-full" alt="" src={`🦆 icon "chevron right".svg`} />
          <img className="absolute top-[7.13rem] left-[8.19rem] w-[12.5rem] h-[12.5rem] overflow-hidden" alt="" src="identifiable natural person.svg" />
      </div>
      <div className="relative w-[161.5rem] h-[29.5rem] overflow-hidden shrink-0 z-[5]">
          <b className="absolute top-[8.75rem] left-[30.38rem]">UserWithdrawals</b>
          <img className="absolute h-[27.75%] w-[3.49%] top-[32.42%] right-[12.92%] bottom-[39.83%] left-[83.59%] max-w-full overflow-hidden max-h-full" alt="" src={`🦆 icon "chevron right".svg`} />
          <img className="absolute h-[42.37%] w-[7.74%] top-[20.55%] right-[86.65%] bottom-[37.08%] left-[5.61%] max-w-full overflow-hidden max-h-full" alt="" src="Group.svg" />
      </div>
      <div className="relative w-[161.5rem] h-[29.5rem] overflow-hidden shrink-0 z-[6]">
          <b className="absolute top-[8.75rem] left-[30.38rem]">UserEarlyPays</b>
          <img className="absolute h-[27.75%] w-[3.49%] top-[32.42%] right-[12.92%] bottom-[39.83%] left-[83.59%] max-w-full overflow-hidden max-h-full" alt="" src={`🦆 icon "chevron right".svg`} />
          <img className="absolute top-[7.44rem] left-[8.5rem] w-[12.5rem] h-[12.5rem] overflow-hidden" alt="" src="built in payment processing.svg" />
      </div>
      <div className="relative w-[161.5rem] h-[29.5rem] overflow-hidden shrink-0 z-[7]">
          <b className="absolute top-[8.75rem] left-[30.38rem]">Client Payments</b>
          <img className="absolute h-[27.75%] w-[3.49%] top-[32.42%] right-[12.92%] bottom-[39.83%] left-[83.59%] max-w-full overflow-hidden max-h-full" alt="" src={`🦆 icon "chevron right".svg`} />
          <img className="absolute top-[6.06rem] left-[8.19rem] w-[12.5rem] h-[12.5rem] overflow-hidden" alt="" src="payment.svg" />
      </div>
      <div className="relative w-[161.5rem] h-[29.5rem] overflow-hidden shrink-0 z-[8]">
          <b className="absolute top-[7.63rem] left-[30.38rem] flex items-center w-[55rem] h-[12rem]">Banks</b>
          <img className="absolute h-[27.75%] w-[3.49%] top-[32.42%] right-[12.92%] bottom-[39.83%] left-[83.59%] max-w-full overflow-hidden max-h-full" alt="" src={`🦆 icon "chevron right".svg`} />
          <img className="absolute h-[42.37%] w-[7.74%] top-[26.27%] right-[87.58%] bottom-[31.36%] left-[4.68%] max-w-full overflow-hidden max-h-full" alt="" src="Group.svg" />
      </div>
      <div className="relative w-[161.5rem] h-[29.5rem] overflow-hidden shrink-0 z-[9]">
          <b className="absolute top-[7.63rem] left-[30.38rem] flex items-center w-[55rem] h-[12rem]">Address</b>
          <img className="absolute h-[27.75%] w-[3.49%] top-[32.42%] right-[12.92%] bottom-[39.83%] left-[83.59%] max-w-full overflow-hidden max-h-full" alt="" src={`🦆 icon "chevron right".svg`} />
          <img className="absolute top-[7.63rem] left-[8.81rem] w-[12.5rem] h-[12.5rem] overflow-hidden" alt="" src="business address.svg" />
      </div>
      <b className="absolute my-0 mx-[!important] top-[10.63rem] left-[25.94rem] text-[15.63rem] inline-block text-white text-center z-[10]">AirliPay.</b>
  </div>);
};

export default SideBar;
```
