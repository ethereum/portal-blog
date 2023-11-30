export default {
  footer: (
    <small style={{ display: 'block', marginTop: '8rem' }}>
      <img src="/images/PortalIcon.png" width='50' align='left' />
      <a href="https://www.ethportal.net">Portal Website</a>
      <br />
      <a href="https://github.com/ethereum/portal-network-specs">Portal Specs</a>
      <style jsx>{`
        a {
          float: right;
        }
        @media screen and (max-width: 480px) {
          article {
            padding-top: 2rem;
            padding-bottom: 4rem;
          }
        }
      `}</style>
    </small>
  )
}
