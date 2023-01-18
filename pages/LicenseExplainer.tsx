import React from 'react'

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export default function LicenseExplainer() {
  return (
    <div className="rounded-xl bg-black bg-opacity-40 p-8 px-12 text-left">
      <ReactMarkdown className="reactMarkDown" remarkPlugins={[remarkGfm]}>
        {`There are six variants of the CantBeEvil license:

1.	[CC0 (“PUBLIC”)](https://arweave.net/zmc1WTspIhFyVY82bwfAIcIExLFH5lUcHHUN0wXg4W8/0) – All copyrights are waived under the terms of CC0 1.0 Universal developed by Creative Commons.
2.	[Exclusive Commercial Rights with No Creator Retention (“EXCLUSIVE”)](https://arweave.net/zmc1WTspIhFyVY82bwfAIcIExLFH5lUcHHUN0wXg4W8/1) – Full exclusive commercial rights granted, with no hate speech termination.  Creator does not retain any exploitation rights.
3.	[Non-Exclusive Commercial Rights (“COMMERCIAL”)](https://arweave.net/zmc1WTspIhFyVY82bwfAIcIExLFH5lUcHHUN0wXg4W8/2) – Full non-exclusive commercial rights granted, with no hate speech termination.  Creator retains exploitation rights.
4.	[Non-Exclusive Commercial Rights with Creator Retention & Hate Speech Termination (“COMMERCIAL-NO-HATE”)](https://arweave.net/zmc1WTspIhFyVY82bwfAIcIExLFH5lUcHHUN0wXg4W8/3) – Full non-exclusive commercial rights granted, with hate speech termination.  Creator retains exploitation rights. 
5.	[Personal License (“PERSONAL”)](https://arweave.net/zmc1WTspIhFyVY82bwfAIcIExLFH5lUcHHUN0wXg4W8/4) – Personal rights granted, without hate speech termination.
6.	[Personal License with Hate Speech Termination (“PERSONAL-NO-HATE”)](https://arweave.net/zmc1WTspIhFyVY82bwfAIcIExLFH5lUcHHUN0wXg4W8/5) – Personal rights granted, with hate speech termination.

The text of the Licenses is made freely available to the public under the terms of CC0 1.0 Universal.
You can also find the full licenses and cover letter in this repo [here](/licenses/).

`}
      </ReactMarkdown>
    </div>
  )
}
