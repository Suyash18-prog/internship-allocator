import React from 'react';
import Select from '../../../components/ui/Select';

const LocationSelect = ({ value, onChange, error }) => {
  const indianCities = [
    { value: 'mumbai', label: 'Mumbai, Maharashtra' },
    { value: 'delhi', label: 'New Delhi, Delhi' },
    { value: 'bangalore', label: 'Bangalore, Karnataka' },
    { value: 'hyderabad', label: 'Hyderabad, Telangana' },
    { value: 'ahmedabad', label: 'Ahmedabad, Gujarat' },
    { value: 'chennai', label: 'Chennai, Tamil Nadu' },
    { value: 'kolkata', label: 'Kolkata, West Bengal' },
    { value: 'surat', label: 'Surat, Gujarat' },
    { value: 'pune', label: 'Pune, Maharashtra' },
    { value: 'jaipur', label: 'Jaipur, Rajasthan' },
    { value: 'lucknow', label: 'Lucknow, Uttar Pradesh' },
    { value: 'kanpur', label: 'Kanpur, Uttar Pradesh' },
    { value: 'nagpur', label: 'Nagpur, Maharashtra' },
    { value: 'indore', label: 'Indore, Madhya Pradesh' },
    { value: 'thane', label: 'Thane, Maharashtra' },
    { value: 'bhopal', label: 'Bhopal, Madhya Pradesh' },
    { value: 'visakhapatnam', label: 'Visakhapatnam, Andhra Pradesh' },
    { value: 'pimpri', label: 'Pimpri-Chinchwad, Maharashtra' },
    { value: 'patna', label: 'Patna, Bihar' },
    { value: 'vadodara', label: 'Vadodara, Gujarat' },
    { value: 'ghaziabad', label: 'Ghaziabad, Uttar Pradesh' },
    { value: 'ludhiana', label: 'Ludhiana, Punjab' },
    { value: 'agra', label: 'Agra, Uttar Pradesh' },
    { value: 'nashik', label: 'Nashik, Maharashtra' },
    { value: 'faridabad', label: 'Faridabad, Haryana' },
    { value: 'meerut', label: 'Meerut, Uttar Pradesh' },
    { value: 'rajkot', label: 'Rajkot, Gujarat' },
    { value: 'kalyan', label: 'Kalyan-Dombivali, Maharashtra' },
    { value: 'vasai', label: 'Vasai-Virar, Maharashtra' },
    { value: 'varanasi', label: 'Varanasi, Uttar Pradesh' },
    { value: 'srinagar', label: 'Srinagar, Jammu and Kashmir' },
    { value: 'aurangabad', label: 'Aurangabad, Maharashtra' },
    { value: 'dhanbad', label: 'Dhanbad, Jharkhand' },
    { value: 'amritsar', label: 'Amritsar, Punjab' },
    { value: 'navi_mumbai', label: 'Navi Mumbai, Maharashtra' },
    { value: 'allahabad', label: 'Prayagraj, Uttar Pradesh' },
    { value: 'ranchi', label: 'Ranchi, Jharkhand' },
    { value: 'howrah', label: 'Howrah, West Bengal' },
    { value: 'coimbatore', label: 'Coimbatore, Tamil Nadu' },
    { value: 'jabalpur', label: 'Jabalpur, Madhya Pradesh' },
    { value: 'gwalior', label: 'Gwalior, Madhya Pradesh' },
    { value: 'vijayawada', label: 'Vijayawada, Andhra Pradesh' },
    { value: 'jodhpur', label: 'Jodhpur, Rajasthan' },
    { value: 'madurai', label: 'Madurai, Tamil Nadu' },
    { value: 'raipur', label: 'Raipur, Chhattisgarh' },
    { value: 'kota', label: 'Kota, Rajasthan' },
    { value: 'guwahati', label: 'Guwahati, Assam' },
    { value: 'chandigarh', label: 'Chandigarh, Chandigarh' },
    { value: 'solapur', label: 'Solapur, Maharashtra' },
    { value: 'hubli', label: 'Hubli-Dharwad, Karnataka' },
    { value: 'bareilly', label: 'Bareilly, Uttar Pradesh' },
    { value: 'moradabad', label: 'Moradabad, Uttar Pradesh' },
    { value: 'mysore', label: 'Mysore, Karnataka' },
    { value: 'gurgaon', label: 'Gurugram, Haryana' },
    { value: 'aligarh', label: 'Aligarh, Uttar Pradesh' },
    { value: 'jalandhar', label: 'Jalandhar, Punjab' },
    { value: 'tiruchirappalli', label: 'Tiruchirappalli, Tamil Nadu' },
    { value: 'bhubaneswar', label: 'Bhubaneswar, Odisha' },
    { value: 'salem', label: 'Salem, Tamil Nadu' },
    { value: 'warangal', label: 'Warangal, Telangana' },
    { value: 'mira_bhayandar', label: 'Mira-Bhayandar, Maharashtra' },
    { value: 'thiruvananthapuram', label: 'Thiruvananthapuram, Kerala' },
    { value: 'bhiwandi', label: 'Bhiwandi, Maharashtra' },
    { value: 'saharanpur', label: 'Saharanpur, Uttar Pradesh' },
    { value: 'guntur', label: 'Guntur, Andhra Pradesh' },
    { value: 'amravati', label: 'Amravati, Maharashtra' },
    { value: 'bikaner', label: 'Bikaner, Rajasthan' },
    { value: 'noida', label: 'Noida, Uttar Pradesh' },
    { value: 'jamshedpur', label: 'Jamshedpur, Jharkhand' },
    { value: 'bhilai', label: 'Bhilai, Chhattisgarh' },
    { value: 'cuttack', label: 'Cuttack, Odisha' },
    { value: 'firozabad', label: 'Firozabad, Uttar Pradesh' },
    { value: 'kochi', label: 'Kochi, Kerala' },
    { value: 'nellore', label: 'Nellore, Andhra Pradesh' },
    { value: 'bhavnagar', label: 'Bhavnagar, Gujarat' },
    { value: 'dehradun', label: 'Dehradun, Uttarakhand' },
    { value: 'durgapur', label: 'Durgapur, West Bengal' },
    { value: 'asansol', label: 'Asansol, West Bengal' },
    { value: 'rourkela', label: 'Rourkela, Odisha' },
    { value: 'nanded', label: 'Nanded, Maharashtra' },
    { value: 'kolhapur', label: 'Kolhapur, Maharashtra' },
    { value: 'ajmer', label: 'Ajmer, Rajasthan' },
    { value: 'akola', label: 'Akola, Maharashtra' },
    { value: 'gulbarga', label: 'Gulbarga, Karnataka' },
    { value: 'jamnagar', label: 'Jamnagar, Gujarat' },
    { value: 'ujjain', label: 'Ujjain, Madhya Pradesh' },
    { value: 'loni', label: 'Loni, Uttar Pradesh' },
    { value: 'siliguri', label: 'Siliguri, West Bengal' },
    { value: 'jhansi', label: 'Jhansi, Uttar Pradesh' },
    { value: 'ulhasnagar', label: 'Ulhasnagar, Maharashtra' },
    { value: 'jammu', label: 'Jammu, Jammu and Kashmir' },
    { value: 'sangli', label: 'Sangli-Miraj & Kupwad, Maharashtra' },
    { value: 'mangalore', label: 'Mangalore, Karnataka' },
    { value: 'erode', label: 'Erode, Tamil Nadu' },
    { value: 'belgaum', label: 'Belgaum, Karnataka' },
    { value: 'ambattur', label: 'Ambattur, Tamil Nadu' },
    { value: 'tirunelveli', label: 'Tirunelveli, Tamil Nadu' },
    { value: 'malegaon', label: 'Malegaon, Maharashtra' },
    { value: 'gaya', label: 'Gaya, Bihar' },
    { value: 'jalgaon', label: 'Jalgaon, Maharashtra' },
    { value: 'udaipur', label: 'Udaipur, Rajasthan' },
    { value: 'maheshtala', label: 'Maheshtala, West Bengal' }
  ];

  return (
    <Select
      label="Preferred Location"
      description="Select your preferred internship location"
      placeholder="Choose a city..."
      options={indianCities}
      value={value}
      onChange={onChange}
      error={error}
      searchable
      required
      className="w-full"
    />
  );
};

export default LocationSelect;