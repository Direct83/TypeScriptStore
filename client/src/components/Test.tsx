import { gql, useQuery } from '@apollo/client'
import React from 'react'

const CHECK_AUTH: any = gql`
query {
  check {
    message
  }
}
`;

export default function Test() {
  const { data } = useQuery(CHECK_AUTH)
  console.log(data?.check.message)
  return (
    <>
      {data?.check.message ? data?.check.message : null}
    </>
  )
}



