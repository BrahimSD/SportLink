import {CreateRoom} from '../src/onglets/createRoomComps/CreateRoom'

describe('handleRegionChange()', () => {
    test('should update selected region state', () => {
      const wrapper = shallow(<CreateRoom />)
      const event = { target: { value: 'Auvergne-Rhône-Alpes' } }
      wrapper.instance().handleRegionChange(event)
      expect(wrapper.state('selectedRegion')).toBe('Auvergne-Rhône-Alpes')
    })
  
    test('should reset selected city state', () => {
      const wrapper = shallow(<CreateRoom />)
      wrapper.setState({ selectedCity: 'Paris' })
      const event = { target: { value: 'Île-de-France' } }
      wrapper.instance().handleRegionChange(event)
      expect(wrapper.state('selectedCity')).toBe('Paris')
    })
  })
  
  describe('handleCityChange()', () => {
    test('should update selected city state', () => {
      const wrapper = shallow(<CreateRoom />)
      const event = { target: { value: 'Nice' } }
      wrapper.instance().handleCityChange(event)
      expect(wrapper.state('selectedCity')).toBe('Nice')
    })
  })
  
 
  