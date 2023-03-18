import request from '@/utils/request'

export function getQmj() {
  return request.post('/conn.php')
  }