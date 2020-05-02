import React from 'react'

import {Button} from "@blueprintjs/core"

function Tenant() {
  return (
    <div className="content">

      <h1 className="title noselect">
        Hank Hill
      </h1>
      <hr />

      <div className="flex-sb">
        <p className="address">
          555 Shady Dr. Apt 3<br />
          Huntington, WV 90210<br />
          555-555-1800<br />
          <Button className="mt10" icon="home" text="Go to unit" />
        </p>
      </div>

      <div className="flex-sb mt20">
        <div>
          <h1 className="heading">Lease Agreements</h1>
          <p>
            None
          </p>
        </div>
      </div>

      <div className="flex-sb mt20">
        <div>
          <h1 className="heading">Incidents</h1>
          <p>
            None
          </p>
        </div>
      </div>

      <div className="flex-sb mt20">
        <div>
          <h1 className="heading">Notes</h1>
          <p>
            None
          </p>
        </div>
      </div>

    </div>
  )
}

export default Tenant