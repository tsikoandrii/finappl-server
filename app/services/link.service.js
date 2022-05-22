import { v4 as uuidv4 } from 'uuid';
import User from '../db/models/User'

class LinkService {
  static BASE_URL = 'http://localhost:8000/'
  async createResetLink(userId) {
    const id = uuidv4()
    const link = LinkService.BASE_URL + 'reset/' + id
    await User.findByIdAndUpdate(userId, {resetId: id})
    return link;
  }
}

export default new LinkService()
